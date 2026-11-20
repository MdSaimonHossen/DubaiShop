'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { buildGeneralInquiryWhatsAppUrl } from '@/lib/utils/whatsapp';

interface FAQSectionProps {
  faqs: FAQItem[];
  whatsappNumber: string;
}

export function FAQSection({ faqs, whatsappNumber }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Emergency & Response', 'Battery & Tech', 'Pricing & Warranty', 'Areas & Booking'];

  const filteredFaqs = faqs.filter((f) => {
    if (activeCategory === 'All') return true;
    return f.category === activeCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const whatsappUrl = buildGeneralInquiryWhatsAppUrl(whatsappNumber, 'specific question about battery service');

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Everything you need to know about our mobile diagnostics, warranty fulfillment, and Dubai response times.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/80"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center p-6 bg-white border border-slate-200 rounded-2xl max-w-xl mx-auto shadow-xs">
          <HelpCircle className="h-8 w-8 text-sky-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Still have a question regarding your vehicle?
          </h4>
          <p className="text-xs text-slate-600 mb-4">
            Our Dubai technical team is available on WhatsApp to answer any specific battery or vehicle question.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
