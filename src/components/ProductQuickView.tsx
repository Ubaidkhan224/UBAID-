import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Check, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPKR, buildWhatsAppUrl } from '../utils/formatters';

export const ProductQuickView: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsCartOpen } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (quickViewProduct?.sizes && quickViewProduct.sizes.length > 0) {
      setSelectedSize(quickViewProduct.sizes[0]);
    } else {
      setSelectedSize('Standard');
    }
    setQuantity(1);
    setAdded(false);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    if (!quickViewProduct.inStock) return;
    addToCart(quickViewProduct, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
      setIsCartOpen(true);
    }, 800);
  };

  const handleWhatsAppInquiry = () => {
    const text = `Hi, I am interested in ordering "${quickViewProduct.name}" (${formatPKR(
      quickViewProduct.pricePKR
    )}, Size: ${selectedSize}) from Sport Accessories. Please let me know availability and delivery charges to my city!`;
    const url = buildWhatsAppUrl(text);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl text-zinc-900 shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 text-zinc-500 hover:text-zinc-950 rounded-full border border-zinc-200 hover:bg-zinc-100 transition-colors shadow-sm"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Visual Showcase (5 Cols) */}
          <div className="md:col-span-5 bg-zinc-100 p-6 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r border-zinc-200">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 shadow-md bg-white">
              <img
                src={quickViewProduct.image}
                alt={`${quickViewProduct.name} - ${quickViewProduct.spec} - Sport Accessories Cricket Gear Pakistan`}
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
                  const fallback = fallbackMap[quickViewProduct.category] || '/images/cricket-hero.jpg';
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
              {quickViewProduct.badge && (
                <span className="absolute top-3 left-3 bg-lime-400 text-zinc-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border border-lime-500/50">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            <div className="mt-4 w-full text-center">
              <span className="text-[11px] font-mono text-zinc-500 font-medium block">
                {quickViewProduct.spec}
              </span>
            </div>
          </div>

          {/* Details & Purchase Actions (7 Cols) */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4 bg-white">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-lime-700 uppercase tracking-wider">
                <span>Cricket Gear</span>
                <span aria-hidden="true">·</span>
                <span>Pakistan Delivery</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 font-heading mt-1 leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Price */}
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-2xl font-black text-zinc-950 font-mono tabular-nums">
                  {formatPKR(quickViewProduct.pricePKR)}
                </span>
                {quickViewProduct.originalPricePKR && (
                  <span className="text-sm text-zinc-400 line-through font-mono tabular-nums">
                    {formatPKR(quickViewProduct.originalPricePKR)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
                {quickViewProduct.shortDescription}
              </p>

              {/* Features List */}
              {quickViewProduct.features && (
                <div className="mt-4 pt-3 border-t border-zinc-100">
                  <span className="text-xs font-bold uppercase text-zinc-500 block mb-2">
                    Key Specifications & Features:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-700">
                    {quickViewProduct.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-lime-600 font-black shrink-0">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Select Size / Variant */}
            <div className="pt-2 border-t border-zinc-100 space-y-3">
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                    Select Size or Variant:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-lime-400 border-lime-500 text-zinc-950 shadow-xs'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!quickViewProduct.inStock}
                  className={`w-full py-3 px-4 font-black uppercase text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    !quickViewProduct.inStock
                      ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      : added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-lime-400 hover:bg-lime-500 text-zinc-950 shadow-md border border-lime-500'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 px-4 font-bold uppercase text-xs rounded-xl flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-lime-600" />
                  <span>WhatsApp Inquire</span>
                </button>
              </div>

              {/* Delivery info */}
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
                <Truck className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                <span>Delivery across Pakistan. Courier charges confirmed before dispatch.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
