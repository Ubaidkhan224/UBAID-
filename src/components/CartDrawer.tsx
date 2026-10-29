import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR, getGeneralWhatsAppLink } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount,
    setIsCheckoutOpen,
  } = useShop();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-zinc-950/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 text-zinc-900 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-lime-400 border border-lime-500 flex items-center justify-center text-zinc-950">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black uppercase tracking-wide font-heading text-zinc-950">
                Your Shopping Cart ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-lime-100 border border-lime-300 flex items-center justify-center text-3xl mb-4">
                  🏏
                </div>
                <h3 className="text-base font-bold text-zinc-900 uppercase font-heading">
                  Your cart is empty
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs mt-1 mb-6">
                  Explore our selection of bats, gloves, balls, pads, and full cricket kits.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-lime-400 hover:bg-lime-500 text-zinc-950 text-xs font-black uppercase rounded-xl shadow-sm border border-lime-500"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-zinc-500 pb-2 border-b border-zinc-200">
                  <span>Selected Equipment</span>
                  <button
                    onClick={clearCart}
                    className="text-zinc-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-3 bg-zinc-50 p-3 rounded-xl border border-zinc-200 hover:border-lime-400 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-18 h-18 bg-zinc-100 rounded-lg overflow-hidden shrink-0 border border-zinc-200 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={`${item.product.name} (${item.selectedSize}) - Sport Accessories`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const fallbackMap: { [key: string]: string } = {
                            bats: '/images/bat-lime-white.jpg',
                            gloves: '/images/gloves-lime-white.jpg',
                            balls: '/images/cricket-balls.jpg',
                            pads: '/images/batting-pads.jpg',
                            kits: '/images/kit-bag-lime.jpg',
                          };
                          const fallback = fallbackMap[item.product.category] || '/images/cricket-hero.jpg';
                          if (e.currentTarget.src !== fallback) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-zinc-400 hover:text-red-500 p-0.5 shrink-0"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-zinc-500 block mt-0.5">
                          Size: <span className="text-zinc-800 font-semibold">{item.selectedSize}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        {/* Stepper */}
                        <div className="flex items-center bg-white border border-zinc-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                            }
                            className="p-1 text-zinc-600 hover:text-zinc-950"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-zinc-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                            }
                            className="p-1 text-zinc-600 hover:text-zinc-950"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="text-xs sm:text-sm font-black font-mono text-zinc-950 tabular-nums">
                          {formatPKR(item.product.pricePKR * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Checkout Call to Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50 space-y-4">
              
              {/* Delivery info notice */}
              <div className="flex items-start gap-2.5 p-2.5 bg-lime-50 border border-lime-300 rounded-xl text-[11px] text-zinc-800">
                <Truck className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-950 block font-bold">Delivery Across Pakistan</strong>
                  <span>Actual courier fee and delivery schedule will be confirmed by store prior to dispatch.</span>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-sm font-bold text-zinc-600">Cart Subtotal</span>
                <span className="text-xl font-black font-mono text-zinc-950 tabular-nums">
                  {formatPKR(cartTotal)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-zinc-950 font-black uppercase tracking-wider rounded-xl shadow-md border border-lime-500 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick WhatsApp Assistance */}
              <div className="text-center">
                <a
                  href={getGeneralWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-lime-700 hover:text-lime-900 font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Have questions before ordering? Ask on WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
