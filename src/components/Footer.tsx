import React from 'react';
import { Logo } from './Logo';
import { MessageCircle, Truck, ShieldCheck, ArrowUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getGeneralWhatsAppLink, STORE_PHONE_DISPLAY } from '../utils/formatters';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsEditorOpen } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 text-zinc-400 text-xs">
      {/* Upper features strip in Lime Green */}
      <div className="bg-lime-400 text-zinc-950 py-6 border-b border-lime-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-lime-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-zinc-950 font-black text-sm uppercase font-heading">
                Nationwide Pakistan Delivery
              </h4>
              <p className="text-[11px] text-zinc-800 font-semibold">
                Courier fee and schedule confirmed prior to dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-lime-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-zinc-950 font-black text-sm uppercase font-heading">
                Cash on Delivery Available
              </h4>
              <p className="text-[11px] text-zinc-800 font-semibold">
                Inspect and pay courier on doorstep
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-lime-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-zinc-950 font-black text-sm uppercase font-heading">
                Dedicated WhatsApp Support
              </h4>
              <p className="text-[11px] text-zinc-800 font-semibold">
                Direct help at {STORE_PHONE_DISPLAY}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block">
              <Logo size="md" />
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Sport Accessories is Pakistan's premier destination for genuine cricket equipment. Handpicked English willow bats, test-spec batting gloves, 4-piece leather match balls, protective armours, and complete kit bags.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime-400/20 border border-lime-400/40 text-lime-400 hover:text-white rounded-lg text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {STORE_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-heading">
              Equipment
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleCategoryClick('bats')} className="hover:text-lime-400 transition-colors">
                  Cricket Bats
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('gloves')} className="hover:text-lime-400 transition-colors">
                  Batting Gloves
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('balls')} className="hover:text-lime-400 transition-colors">
                  Leather Balls
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('pads')} className="hover:text-lime-400 transition-colors">
                  Pads & Protection
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('kits')} className="hover:text-lime-400 transition-colors">
                  Kit Bags & Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-heading">
              Help & Store
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollToSection('about-section')} className="hover:text-lime-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq-section')} className="hover:text-lime-400 transition-colors">
                  Delivery & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact-section')} className="hover:text-lime-400 transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => setIsEditorOpen(true)} className="text-lime-400 hover:underline">
                  Edit Prices (Manager)
                </button>
              </li>
            </ul>
          </div>

          {/* Pakistan Delivery Statement */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-heading">
              Pakistan Operations
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Serving cricketers in Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad, Gilgit-Baltistan, and Azad Jammu & Kashmir.
            </p>
            <div className="pt-2 text-[11px] text-zinc-400">
              <span>Customer Care: </span>
              <a href={`tel:${STORE_PHONE_DISPLAY}`} className="text-zinc-200 hover:text-lime-400 font-mono font-bold">
                {STORE_PHONE_DISPLAY}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Back to Top */}
      <div className="border-t border-zinc-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} Sport Accessories Pakistan. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-lime-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
