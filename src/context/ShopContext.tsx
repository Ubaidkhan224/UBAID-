import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, INITIAL_PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, size?: string, qty?: number) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Filtering & Search
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;

  // Catalog Management (Editable sample names & prices)
  updateProduct: (updated: Product) => void;
  addNewProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetCatalogToDefaults: () => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'sport_accessories_pk_products_v5';
const CART_STORAGE_KEY = 'sport_accessories_pk_cart_v5';

// Normalizes image path to ensure reliable static delivery in both dev and production
function normalizeProductImage(image: string, category: string): string {
  if (!image || image.startsWith('/src/')) {
    switch (category) {
      case 'bats':
        return '/images/bat-lime-white.jpg';
      case 'gloves':
        return '/images/gloves-lime-white.jpg';
      case 'balls':
        return '/images/cricket-balls.jpg';
      case 'pads':
        return '/images/batting-pads.jpg';
      case 'kits':
        return '/images/kit-bag-lime.jpg';
      default:
        return '/images/cricket-hero.jpg';
    }
  }
  return image;
}

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or defaults with verified public image paths
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p) => ({
            ...p,
            image: normalizeProductImage(p.image, p.category)
          }));
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved products, falling back to defaults', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          product: {
            ...item.product,
            image: normalizeProductImage(item.product.image, item.product.category)
          }
        }));
      }
    } catch (e) {
      console.warn('Failed to parse cart', e);
    }
    return [];
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Temporary toast notification
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const addToCart = (product: Product, size?: string, qty = 1) => {
    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize
      );

      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx] = {
          ...newCart[existingIdx],
          quantity: newCart[existingIdx].quantity + qty
        };
        return newCart;
      } else {
        return [...prevCart, { product, quantity: qty, selectedSize: chosenSize }];
      }
    });

    showNotification(`Added ${product.name} to cart`);
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
    showNotification('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.pricePKR * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Catalog modification actions
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    // Also update any matching product inside cart so prices stay synced
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === updated.id ? { ...item, product: updated } : item
      )
    );
    showNotification(`Updated "${updated.name}"`);
  };

  const addNewProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showNotification(`Added new product "${product.name}"`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    showNotification('Product removed from store catalog');
  };

  const resetCatalogToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    showNotification('Store catalog reset to default items & prices');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isEditorOpen,
        setIsEditorOpen,
        quickViewProduct,
        setQuickViewProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        updateProduct,
        addNewProduct,
        deleteProduct,
        resetCatalogToDefaults,
        notification,
        showNotification,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
