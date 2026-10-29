import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCatalog } from './components/ProductCatalog';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductQuickView } from './components/ProductQuickView';
import { ProductEditorModal } from './components/ProductEditorModal';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { getGeneralWhatsAppLink } from './utils/formatters';

const MainStoreContent: React.FC = () => {
  const { notification } = useShop();

  const handleScrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Showcase */}
      <Hero onExploreClick={handleScrollToProducts} />

      {/* Category Fast Switcher Strip */}
      <CategoryNav />

      {/* Main Interactive Product Catalog */}
      <main className="flex-1 bg-white">
        <ProductCatalog />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-out Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <ProductQuickView />
      <ProductEditorModal />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 border border-lime-400 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Floating WhatsApp Quick Action Button for Pakistani Shoppers */}
      <a
        href={getGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-lime-400 hover:bg-lime-500 text-zinc-950 p-3.5 rounded-full shadow-2xl shadow-lime-500/40 border-2 border-lime-500 flex items-center gap-2.5 transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
        aria-label="Direct WhatsApp inquiry"
        title="Chat on WhatsApp (+92 324 5772549)"
      >
        <MessageCircle className="w-6 h-6 fill-zinc-950 text-lime-400" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-black pr-1 uppercase tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainStoreContent />
    </ShopProvider>
  );
}
