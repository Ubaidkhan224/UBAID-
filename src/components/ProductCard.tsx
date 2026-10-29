import React, { useState } from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { formatPKR } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const categoryName = {
    bats: 'Cricket Bat',
    gloves: 'Batting Gloves',
    balls: 'Match Leather Ball',
    pads: 'Protective Leg Guard',
    kits: 'Kit Bag / Full Combo'
  }[product.category] || 'Equipment';

  return (
    <div 
      onClick={() => setQuickViewProduct(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-zinc-200/90 hover:border-lime-500 hover:shadow-xl hover:shadow-lime-500/15 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Visual Asset Container */}
      <div className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden border-b border-zinc-200/80 flex items-center justify-center">
        
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.15),transparent_70%)] pointer-events-none" />

        {!imageError ? (
          <img
            src={product.image}
            alt={`${product.name} - ${categoryName} (${product.spec})`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Zero-Broken-Image Fallback Container */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-lime-50 via-zinc-50 to-zinc-100 text-center">
            <span className="text-3xl mb-2">🏏</span>
            <span className="text-xs font-black uppercase tracking-wider text-lime-800">
              Sport Accessories Pakistan
            </span>
            <span className="text-xs font-bold text-zinc-900 mt-1 line-clamp-1">{product.name}</span>
            <span className="text-[10px] text-zinc-500 mt-0.5">{product.spec}</span>
          </div>
        )}

        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-lime-400 text-zinc-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border border-lime-500/50">
              {product.badge}
            </span>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-zinc-200 text-zinc-700 border border-zinc-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Hover Action */}
        <div className="absolute inset-0 bg-zinc-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="px-3.5 py-2 bg-white hover:bg-lime-400 text-zinc-950 text-xs font-extrabold rounded-lg shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all border border-zinc-200"
          >
            <Eye className="w-4 h-4 text-zinc-900" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Unboxed clean metadata */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
            <span className="text-lime-700">{categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>In Pakistan</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-zinc-900 group-hover:text-lime-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Spec details */}
          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
            {product.spec}
          </p>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 1 && (
          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
            <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
              Select Variant / Size:
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-zinc-50 text-xs text-zinc-800 border border-zinc-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-lime-500 font-medium"
            >
              {product.sizes.map((sz) => (
                <option key={sz} value={sz} className="bg-white text-zinc-900">
                  {sz}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-zinc-950 font-mono tabular-nums">
                {formatPKR(product.pricePKR)}
              </span>
              {product.originalPricePKR && (
                <span className="text-xs text-zinc-400 line-through font-mono tabular-nums">
                  {formatPKR(product.originalPricePKR)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-400">
              * Delivery charges confirmed by store
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-3.5 py-2 text-xs font-black rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              !product.inStock
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-lime-400 hover:bg-lime-500 text-zinc-950 active:scale-95 shadow-sm border border-lime-500'
            }`}
            title="Add to cart"
            aria-label={`Add ${product.name} to cart`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
