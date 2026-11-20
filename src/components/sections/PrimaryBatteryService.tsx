'use client';

import React from 'react';
import Link from 'next/link';
import { siteImages } from '@/lib/images';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface PrimaryBatteryServiceProps {
  onRequestModalOpen?: () => void;
}

export function PrimaryBatteryService({ onRequestModalOpen }: PrimaryBatteryServiceProps) {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Composition */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
              <img
                src={siteImages.batteryService.src}
                alt={siteImages.batteryService.alt}
                className="w-full h-full object-cover object-center filter brightness-95"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">
              Diagnostic-First Standard
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We test your battery first.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              A dead car is often a drained charge or an alternator fault. Our technician conducts a digital conductance test before replacing anything. If the battery is still healthy, we jump-start it safely—saving you the cost of an unnecessary replacement.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Memory saver connected to protect vehicle computer settings</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>ECU battery registration for BMW, Mercedes, and European Start-Stop</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Official 12 to 24-month manufacturer warranty with digital records</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <Button
                variant="primary"
                size="md"
                onClick={onRequestModalOpen}
                className="font-bold px-6"
              >
                <span>Book Battery Service</span>
              </Button>

              <Link
                href="/services/car-battery-replacement"
                className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-sky-600 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View service details</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
