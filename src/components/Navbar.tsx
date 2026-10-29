import React, { useState } from 'react';
import { ShoppingBag, Search, Settings2, Menu, X, PhoneCall } from 'lucide-react';
import { Logo } from './Logo';
import { useShop } from '../context/ShopContext';
import { formatPKR, STORE_PHONE_DISPLAY } from '../utils/formatters';

export const Navbar: React.FC = () => {
  const {
    cartItemCount,
    cartTotal,
    setIsCartOpen,
    setIsEditorOpen,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (category: string) => {
    setSelectedCategory(category);
    setIsMobileMenuOpen(false);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTo = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-lime-500 text-zinc-950 text-xs py-1.5 px-4 font-semibold border-b border-lime-600/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-[11px] sm:text-xs">
          <span className="truncate">
            <span className="font-extrabold uppercase bg-zinc-950 text-white px-1.5 py-0.5 rounded text-[10px] mr-1.5">Delivery</span>
            Nationwide across Pakistan · Courier charges confirmed by store before dispatch
          </span>
          <div className="hidden md:flex items-center gap-3 shrink-0 text-zinc-900 font-medium">
            <span>Cash on Delivery Available</span>
            <span>·</span>
            <span className="font-bold">WhatsApp: {STORE_PHONE_DISPLAY}</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="shrink-0 flex items-center transition-transform hover:scale-[1.02]"
        >
          <Logo size="md" />
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide text-zinc-700">
          <button 
            onClick={() => handleNavClick('all')} 
            className="hover:text-lime-600 transition-colors whitespace-nowrap shrink-0 text-zinc-900 font-bold"
          >
            All Gear
          </button>
          <button 
            onClick={() => handleNavClick('bats')} 
            className="hover:text-lime-600 transition-colors whitespace-nowrap shrink-0"
          >
            Bats
          </button>
          <button 
            onClick={() => handleNavClick('gloves')} 
            className="hover:text-lime-600 transition-colors whitespace-nowrap shrink-0"
          >
            Gloves
          </button>
          <button 
            onClick={() => handleNavClick('balls')} 
            className="hover:text-lime-600 transition-colors whitespace-nowrap shrink-0"
          >
            Leather Balls
          </button>
          <button 
            onClick={() => handleNavClick('pads')} 
            className="hover:text-lime-600 transition-colors whitespace-nowrap shrink-0"
          >
            Pads & Guards
          </button>
          <button 
            onClick={() => handleNavClick('kits')} 
            className="hover:text-lime-600 transition-colors whitespace-nowrap shrink-0"
          >
            Kits
          </button>
          <button 
            onClick={() => handleScrollTo('about-section')} 
            className="hover:text-lime-600 transition-colors whitespace-nowrap shrink-0 text-zinc-500"
          >
            About & FAQ
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Manage Prices, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Search Input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-zinc-50 border-2 border-lime-500 rounded-lg px-2.5 py-1.5 shadow-sm">
                <Search className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search cricket gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none w-32 sm:w-44 font-medium"
                />
                <button 
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }} 
                  className="text-zinc-400 hover:text-zinc-700 ml-1 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                title="Search cricket equipment"
                aria-label="Search equipment"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Edit Sample Products & Prices button */}
          <button
            onClick={() => setIsEditorOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-lg transition-colors whitespace-nowrap"
            title="Edit product names and prices in PKR"
          >
            <Settings2 className="w-3.5 h-3.5 text-lime-600" />
            <span>Edit Prices</span>
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-extrabold text-zinc-950 bg-lime-400 hover:bg-lime-500 rounded-lg shadow-sm border border-lime-500 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-zinc-950" />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 ? (
              <span className="flex items-center justify-center bg-zinc-950 text-lime-400 text-[11px] font-black rounded-full h-5 min-w-[20px] px-1 tabular-nums">
                {cartItemCount}
              </span>
            ) : (
              <span className="text-zinc-700 text-[11px] font-medium hidden md:inline">
                (0)
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden md:inline pl-1 border-l border-lime-600/40 text-zinc-950 font-mono text-[11px] tabular-nums font-bold">
                {formatPKR(cartTotal)}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-150 shadow-lg">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search bats, balls, gloves, pads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 text-sm text-zinc-900 px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-lime-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-medium mb-4">
            <button
              onClick={() => handleNavClick('all')}
              className="text-left px-3 py-2 rounded bg-zinc-50 hover:bg-lime-50 text-zinc-800 font-semibold"
            >
              🏏 All Equipment
            </button>
            <button
              onClick={() => handleNavClick('bats')}
              className="text-left px-3 py-2 rounded bg-zinc-50 hover:bg-lime-50 text-zinc-800"
            >
              🏏 Cricket Bats
            </button>
            <button
              onClick={() => handleNavClick('gloves')}
              className="text-left px-3 py-2 rounded bg-zinc-50 hover:bg-lime-50 text-zinc-800"
            >
              🧤 Batting Gloves
            </button>
            <button
              onClick={() => handleNavClick('balls')}
              className="text-left px-3 py-2 rounded bg-zinc-50 hover:bg-lime-50 text-zinc-800"
            >
              🔴 Leather Balls
            </button>
            <button
              onClick={() => handleNavClick('pads')}
              className="text-left px-3 py-2 rounded bg-zinc-50 hover:bg-lime-50 text-zinc-800"
            >
              🛡️ Batting Pads
            </button>
            <button
              onClick={() => handleNavClick('kits')}
              className="text-left px-3 py-2 rounded bg-zinc-50 hover:bg-lime-50 text-zinc-800"
            >
              🎒 Full Kits & Bags
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200 text-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEditorOpen(true);
                }}
                className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-950 py-1 font-semibold"
              >
                <Settings2 className="w-3.5 h-3.5 text-lime-600" />
                <span>Edit Sample Products & Prices (PKR)</span>
              </button>
              <button
                onClick={() => handleScrollTo('about-section')}
                className="text-zinc-500 hover:text-zinc-800"
              >
                About & FAQ
              </button>
            </div>
            <a
              href="tel:+923245772549"
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-950 py-1 font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5 text-lime-600" />
              <span>Call / WhatsApp: {STORE_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
