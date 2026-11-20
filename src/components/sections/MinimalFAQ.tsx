'use client';

import React, { useState } from 'react';
import { FAQItem, SiteSettings } from '@/types';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import { buildGeneralInquiryWhatsAppUrl } from '@/lib/utils/whatsapp';

interface MinimalFAQProps {
  faqs: FAQItem[];
  settings?: SiteSettings;
  title?: string;
  subtitle?: string;
  limit?: number;
}

export function MinimalFAQ({
  faqs,
  settings,
  title = 'Frequently asked questions.',
  subtitle = 'Clear answers regarding Dubai heat degradation, diagnostic procedures, battery registration, and warranty fulfillment.',
  limit = 7
}: MinimalFAQProps) {
  // Only display active FAQs, sorted by displayOrder
  const activeFaqs = faqs
    .filter((f) => f.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, limit);

  const [openId, setOpenId] = useState<string | null>(
    activeFaqs.length > 0 ? activeFaqs[0].id : null
  );

  if (!activeFaqs || activeFaqs.length === 0) {
    return null;
  }

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const whatsappNumber = settings?.whatsappNumber || '+971 58 000 0000';
  const whatsappUrl = buildGeneralInquiryWhatsAppUrl(whatsappNumber, 'specific question about battery service or warranty');

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Section Headline & Direct WhatsApp Contact */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">
              Clear Answers
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  Have a specific question not covered here?
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our dispatch coordinator answers vehicle battery compatibility and basement access inquiries immediately.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Accordion List */}
          <div className="lg:col-span-7 divide-y divide-slate-200/90 border-t border-b border-slate-200/90">
            {activeFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left group gap-4 cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {faq.question}
                    </span>
                    <span className="shrink-0 p-1 rounded-full text-slate-400 group-hover:text-slate-900 transition-colors">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 sm:pt-4 pr-6 sm:pr-8 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
