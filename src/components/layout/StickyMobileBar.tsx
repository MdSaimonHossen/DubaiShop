'use client';

import React from 'react';
import { Phone, MessageSquare, Wrench } from 'lucide-react';
import { SiteSettings } from '@/types';
import { buildEmergencyWhatsAppUrl } from '@/lib/utils/whatsapp';

interface StickyMobileBarProps {
  settings: SiteSettings;
  onRequestModalOpen?: () => void;
}

export function StickyMobileBar({ settings, onRequestModalOpen }: StickyMobileBarProps) {
  const whatsappUrl = buildEmergencyWhatsAppUrl({
    whatsappNumber: settings.whatsappNumber,
    issue: 'Car will not start / Battery service needed immediately'
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 sm:p-3 shadow-2xl lg:hidden">
      <div className="grid grid-cols-3 gap-2">
        {/* Direct Call Button */}
        <a
          href={`tel:${settings.phoneEmergency}`}
          onClick={handlePhoneClick}
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-900 text-white rounded-xl active:bg-slate-800 transition-colors shadow-sm"
        >
          <Phone className="h-5 w-5 text-amber-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Now</span>
        </a>

        {/* WhatsApp Live Location Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-600 text-white rounded-xl active:bg-emerald-700 transition-colors shadow-sm"
        >
          <MessageSquare className="h-5 w-5 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Quick Booking Button */}
        <button
          type="button"
          onClick={onRequestModalOpen}
          className="flex flex-col items-center justify-center py-2 px-1 bg-sky-600 text-white rounded-xl active:bg-sky-700 transition-colors shadow-sm"
        >
          <Wrench className="h-5 w-5 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Book Service</span>
        </button>
      </div>
    </div>
  );
}
