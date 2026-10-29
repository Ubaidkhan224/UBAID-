import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { getGeneralWhatsAppLink, STORE_PHONE_DISPLAY, STORE_EMAIL, buildWhatsAppUrl } from '../utils/formatters';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const fullText = `*Inquiry from Sport Accessories Website*\nFrom: ${name} (${phone || 'No phone provided'})\nMessage: ${message}`;
    const url = buildWhatsAppUrl(fullText);
    window.open(url, '_blank');

    setSent(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-16 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact details & Prominent WhatsApp Button */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-lime-700 bg-lime-100 border border-lime-300 px-2.5 py-0.5 rounded-full inline-block">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 font-heading tracking-tight mt-2">
                TALK TO OUR CRICKET SPECIALISTS
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                Need guidance selecting the right willow cleft, bat balance, or batting glove size? Reach out directly via WhatsApp or phone.
              </p>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-5 bg-lime-100/70 border-2 border-lime-400 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center gap-2.5 text-lime-900 font-extrabold text-sm uppercase">
                <MessageCircle className="w-5 h-5 text-lime-700" />
                <span>Instant WhatsApp Support</span>
              </div>
              <p className="text-xs text-zinc-800 font-medium">
                Tap below to send a pre-filled inquiry directly to our support desk on WhatsApp:
              </p>
              
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-lime-400 hover:bg-lime-500 text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-sm border border-lime-500 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-zinc-950" />
                <span>WhatsApp: {STORE_PHONE_DISPLAY}</span>
              </a>
              <span className="text-[11px] text-zinc-600 block text-center italic">
                * Prefilled: "Hi, I have a question about your cricket accessories."
              </span>
            </div>

            {/* Direct Channels Info */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-lime-100 flex items-center justify-center text-lime-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px] font-semibold">Phone / Call</span>
                  <a href={`tel:${STORE_PHONE_DISPLAY}`} className="text-zinc-900 font-bold hover:text-lime-700">
                    {STORE_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-lime-100 flex items-center justify-center text-lime-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px] font-semibold">Email Inquiries</span>
                  <a href={`mailto:${STORE_EMAIL}`} className="text-zinc-900 font-bold hover:text-lime-700">
                    {STORE_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-lime-100 flex items-center justify-center text-lime-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-500 block text-[11px] font-semibold">Nationwide Dispatch Hub</span>
                  <span className="text-zinc-900 font-bold">
                    Sialkot & Rawalpindi distribution centers · Serving all Pakistan
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 p-6 sm:p-8 rounded-2xl shadow-xs">
            <h3 className="text-lg font-black text-zinc-950 uppercase font-heading">
              Send an Online Inquiry
            </h3>
            <p className="text-xs text-zinc-500 mt-1 mb-6 font-medium">
              Fill in your details below and we will connect with you with product recommendations.
            </p>

            {sent ? (
              <div className="p-6 bg-lime-50 border border-lime-300 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-lime-600 mx-auto" />
                <h4 className="text-sm font-bold text-zinc-950">Opening WhatsApp Inquiry...</h4>
                <p className="text-xs text-zinc-700">
                  Thank you! Your message is being routed directly to our team at {STORE_PHONE_DISPLAY}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Your Name <span className="text-lime-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="03xx-xxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Your Cricket Question or Equipment Need <span className="text-lime-700">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi, I would like to inquire about bat balance, knocking services, or team gear package..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-lime-500 font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-lime-400 hover:bg-lime-500 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md border border-lime-500"
                  >
                    <Send className="w-4 h-4 text-zinc-950" />
                    <span>Send Inquiry to Store</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
