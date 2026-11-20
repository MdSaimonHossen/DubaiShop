'use client';

import React from 'react';
import Image from 'next/image';
import { SiteSettings } from '@/types';
import { Button } from '@/components/ui/Button';
import { buildEmergencyWhatsAppUrl } from '@/lib/utils/whatsapp';
import { siteImages } from '@/lib/images';
import { Phone, MessageSquare, ArrowRight } from 'lucide-react';

interface EmergencyHeroProps {
  settings: SiteSettings;
  onRequestModalOpen: () => void;
}

export function EmergencyHero({ settings, onRequestModalOpen }: EmergencyHeroProps) {
  const whatsappUrl = buildEmergencyWhatsAppUrl({
    whatsappNumber: settings.whatsappNumber,
    issue: 'Car will not start / Dead battery assistance needed'
  });

  const handleWhatsAppClick = () => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'WHATSAPP_CLICK', pageUrl: '/' })
    }).catch(() => {});
  };

  const handlePhoneClick = () => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'PHONE_CALL', pageUrl: '/' })
    }).catch(() => {});
  };

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Focused Copy & Dual CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mobile response units active in Dubai</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Car battery service, <br />
              <span className="text-slate-300">wherever you are.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed font-normal">
              Digital testing, genuine battery replacement, and roadside assistance delivered directly to your vehicle anywhere in Dubai.
            </p>

            {/* Exactly Two Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onRequestModalOpen}
                className="bg-white text-slate-950 hover:bg-slate-100 font-bold px-7"
              >
                <span>Book Battery Service</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm transition-colors shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Quiet, Clean Emergency Hotline Proof */}
            <div className="pt-4 text-xs text-slate-400 flex items-center gap-2">
              <span>Emergency phone dispatch:</span>
              <a
                href={`tel:${settings.phoneEmergency}`}
                onClick={handlePhoneClick}
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
              >
                {settings.phoneEmergency}
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Hero Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-[4/3] bg-slate-900">
              <img
                src={siteImages.hero.src}
                alt={siteImages.hero.alt}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-xs text-slate-300 flex items-center justify-between">
                <span className="font-semibold text-white">Technician on-site installation</span>
                <span className="text-slate-400">12–24 Mo Manufacturer Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
