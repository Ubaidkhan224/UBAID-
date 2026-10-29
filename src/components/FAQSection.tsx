import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppLink, STORE_PHONE_DISPLAY } from '../utils/formatters';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does nationwide delivery in Pakistan work?',
    answer: 'We dispatch cricket gear to all major cities and towns across Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, and beyond). Once you place an order, our store team contacts you to verify address details and confirm dispatch.'
  },
  {
    question: 'Are delivery charges and delivery times fixed?',
    answer: 'No. Delivery charges and delivery transit times depend on your destination city and package weight (e.g. kit bags vs small accessories). Delivery charges and schedules will be confirmed directly with you by the store team prior to dispatch.'
  },
  {
    question: 'What payment options do you support?',
    answer: 'We support Cash on Delivery (COD) where you pay upon receiving the shipment. If you prefer paying in advance via direct bank transfer (Meezan / HBL / Allied) or mobile wallet (EasyPaisa / JazzCash), our team will provide account details upon order confirmation. Note that direct online credit card gateway integration is currently in progress.'
  },
  {
    question: 'Can you knock-in and oil the cricket bat before shipping?',
    answer: 'Yes! We offer machine knocking-in and edge-bone protection upon request. You can mention this in the checkout notes or send a message to us on WhatsApp (+92 324 5772549) with your order ID.'
  },
  {
    question: 'How do I place a custom order or inquire via WhatsApp?',
    answer: 'You can tap the WhatsApp button anywhere on the site or message +92 324 5772549. Our team can advise on bat weights, sizing for batting pads and gloves, and custom team gear combinations.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-16 bg-white border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-lime-700 bg-lime-100 border border-lime-300 px-2.5 py-0.5 rounded-full inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 font-heading tracking-tight mt-2">
            DELIVERY, PAYMENTS & GEAR QUESTIONS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-xl mx-auto font-medium">
            Clear details regarding orders, payments, and delivery across Pakistan.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-100/60"
                >
                  <span className="text-sm sm:text-base font-bold text-zinc-900 font-heading">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-lime-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/80 pt-3 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="mt-8 p-5 bg-lime-50 border border-lime-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="text-sm font-extrabold text-zinc-950 uppercase">Have a specific question about gear?</h4>
            <p className="text-xs text-zinc-700 mt-0.5">
              Contact our equipment specialists directly on WhatsApp: <strong className="text-zinc-950">{STORE_PHONE_DISPLAY}</strong>
            </p>
          </div>
          <a
            href={getGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-lime-400 hover:bg-lime-500 text-zinc-950 text-xs font-black uppercase rounded-xl flex items-center gap-2 shrink-0 transition-colors border border-lime-500 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-zinc-950" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
