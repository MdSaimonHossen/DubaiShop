'use client';

import React from 'react';
import { Phone, MessageSquare, Wrench, ShieldCheck, Clock } from 'lucide-react';
import { SiteSettings } from '@/types';
import { Button } from '@/components/ui/Button';
import { buildEmergencyWhatsAppUrl } from '@/lib/utils/whatsapp';

interface EmergencyCTAProps {
  settings: SiteSettings;
  onRequestModalOpen?: () => void;
}

export function EmergencyCTA({ settings, onRequestModalOpen }: EmergencyCTAProps) {
  const whatsappUrl = buildEmergencyWhatsAppUrl({
    whatsappNumber: settings.whatsappNumber,
    issue: 'Car will not start / Emergency assistance needed'
  });

  const handlePhoneClick = () => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'PHONE_CALL', pageUrl: window.location.pathname })
    }).catch(() => {});
  };

  const handleWhatsAppClick = () => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'WHATSAPP_CLICK', pageUrl: window.location.pathname })
    }).catch(() => {});
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-semibold mb-4 border border-slate-700">
          <Clock className="h-3.5 w-3.5" />
          <span>Mobile Technicians Ready for Dispatch</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Need Your Car Back on the Road?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto">
          Don’t wait for a tow truck. We come to your parking spot in Dubai with digital testing equipment, genuine batteries, and certified technicians.
        </p>

        {/* Triple Action Conversion Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={`tel:${settings.phoneEmergency}`}
            onClick={handlePhoneClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-bold text-sm shadow-lg transition-all"
          >
            <Phone className="h-4 w-4 text-sky-600" />
            <span>Call Dispatch ({settings.phoneEmergency})</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp Live Location</span>
          </a>

          <Button
            variant="accent"
            size="md"
            onClick={onRequestModalOpen}
            className="w-full sm:w-auto font-bold py-3.5 rounded-xl text-sm"
          >
            <Wrench className="h-4 w-4 mr-2" />
            <span>Request On-Site Service</span>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>12–24 Months Official Warranty</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            <span>Free Alternator Diagnostic Test</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>Zero Advance Payment Required</span>
          </span>
        </div>
      </div>
    </section>
  );
}
