'use client';

import React from 'react';
import { SiteSettings } from '@/types';
import { Button } from '@/components/ui/Button';
import { buildEmergencyWhatsAppUrl } from '@/lib/utils/whatsapp';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface MinimalFinalCTAProps {
  settings: SiteSettings;
  onRequestModalOpen?: () => void;
}

export function MinimalFinalCTA({ settings, onRequestModalOpen }: MinimalFinalCTAProps) {
  const whatsappUrl = buildEmergencyWhatsAppUrl({
    whatsappNumber: settings.whatsappNumber,
    issue: 'Car will not start / Roadside assistance needed'
  });

  const handleWhatsAppClick = () => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'WHATSAPP_CLICK', pageUrl: window.location.pathname })
    }).catch(() => {});
  };

  return (
    <section className="py-20 md:py-28 bg-slate-950 text-white">
      <div className="container-custom text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Need help with your car?
        </h2>

        <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
          Book mobile battery service or send your live location on WhatsApp for immediate technician dispatch.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onRequestModalOpen}
            className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-100 font-bold px-8 shadow-md"
          >
            <span>Book Battery Service</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-md transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <p className="text-xs text-slate-500 pt-4">
          No advance fees • Pay on location (Card/Apple Pay/Cash) after testing and installation.
        </p>
      </div>
    </section>
  );
}
