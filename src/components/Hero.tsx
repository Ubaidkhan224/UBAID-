import React from 'react';
import { ArrowDown, MessageCircle, ShieldCheck, Truck, Award, Zap } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/formatters';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-zinc-200">
      {/* Dynamic athletic lime green radial background glow on clean white */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(163,230,53,0.35),rgba(255,255,255,0))]" />
      
      {/* Subtle athletic dot/grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Athletic Kicker */}
            <div className="inline-flex items-center gap-2 self-start text-xs font-extrabold uppercase tracking-wider text-lime-900 bg-lime-100 border border-lime-300 px-3 py-1.5 rounded-full shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-lime-600 text-lime-600" />
              <span>Engineered For Power & Precision · Pakistan</span>
            </div>

            {/* Main Headline with text-wrap balance */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 uppercase leading-[1.08] font-heading" style={{ textWrap: 'balance' }}>
              PRO-TIER <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600">CRICKET GEAR</span> BUILT FOR WINNERS.
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-zinc-700 font-bold leading-relaxed max-w-2xl font-['Plus_Jakarta_Sans',sans-serif] border-[#d8d4d4]">
              Equipping tape-ball legends and first-class cricketers across Pakistan. Discover handpicked Grade-1 English willow bats, test-grade batting gloves, 4-piece match balls, lightweight guards, and heavy-duty tour kits.
            </p>

            {/* Key Assurance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-800">
              <div className="flex items-center gap-2.5 bg-white border border-zinc-200/90 rounded-xl p-3 shadow-xs hover:border-lime-400 transition-colors">
                <Truck className="w-4 h-4 text-lime-600 shrink-0" />
                <span className="font-semibold">Nationwide Pakistan Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white border border-zinc-200/90 rounded-xl p-3 shadow-xs hover:border-lime-400 transition-colors">
                <Award className="w-4 h-4 text-lime-600 shrink-0" />
                <span className="font-semibold">Cash on Delivery (COD)</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 bg-white border border-zinc-200/90 rounded-xl p-3 shadow-xs hover:border-lime-400 transition-colors">
                <ShieldCheck className="w-4 h-4 text-lime-600 shrink-0" />
                <span className="font-semibold">100% Genuine Gear</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-zinc-950 bg-lime-400 hover:bg-lime-500 active:bg-lime-600 rounded-xl shadow-lg shadow-lime-500/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer border border-lime-500"
              >
                <span>Explore Equipment</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-zinc-800 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl transition-all transform hover:-translate-y-0.5 whitespace-nowrap shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-lime-600" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Delivery Note */}
            <p className="text-xs text-zinc-500 italic">
              * Delivery available across all cities and towns in Pakistan. Exact courier charges and dispatch schedule will be confirmed by the store team upon order.
            </p>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-200 shadow-xl bg-zinc-100 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 z-10 pointer-events-none" />
              
              <img
                src="/images/cricket-hero.jpg"
                alt="Sport Accessories Cricket Gear Collection - Bats, Gloves, Balls and Equipment"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/public/images/cricket-hero.jpg';
                }}
                className="w-full h-[320px] sm:h-[400px] lg:h-[460px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Athletic floating showcase badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md border border-zinc-200 p-3.5 rounded-xl flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-lime-700 block">Season 2026/27 Drop</span>
                  <p className="text-sm font-bold text-zinc-900">Match Equipment & Sialkot Craftsmanship</p>
                </div>
                <button
                  onClick={onExploreClick}
                  className="px-3.5 py-1.5 text-xs font-black text-zinc-950 bg-lime-400 hover:bg-lime-500 rounded-lg transition-colors shrink-0 shadow-xs"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
