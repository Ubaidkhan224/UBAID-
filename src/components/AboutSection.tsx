import React from 'react';
import { Target, Shield, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-16 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-lime-700 bg-lime-100 border border-lime-300 px-2.5 py-0.5 rounded-full inline-block">
            About Sport Accessories
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-zinc-950 font-heading tracking-tight mt-2">
            DEDICATED TO CRICKET PASSION IN PAKISTAN
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-3 leading-relaxed">
            Sport Accessories was established to bring high-calibre, authentic cricket equipment directly to players across Pakistan. From grassroots tape-ball nocturnal tournaments to club hard-ball leagues and first-class arenas, we focus on genuine equipment that enhances performance on the pitch.
          </p>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs hover:border-lime-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-700 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-950 uppercase font-heading">
              Authentic Equipment Only
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              We verify and inspect each bat cleft, glove seam, and ball core before dispatch. No counterfeit stickers or compromised willow.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs hover:border-lime-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-700 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-950 uppercase font-heading">
              Sialkot Heritage Craftsmanship
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              Pakistan's city of Sialkot is the global epicenter of sports goods. We work closely with experienced bat-makers and leather craftsmen to source tournament-standard gear.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs hover:border-lime-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-700 mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-950 uppercase font-heading">
              Nationwide Reach Across Pakistan
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              Whether you are playing in Karachi, Lahore, Rawalpindi, Peshawar, Quetta, or interior regions, we arrange secure courier dispatch right to your doorstep.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
