'use client';

import React from 'react';
import Link from 'next/link';
import { siteImages } from '@/lib/images';
import { ServiceLocation } from '@/types';
import { MapPin, ArrowRight } from 'lucide-react';

interface DubaiCoverageProps {
  locations: ServiceLocation[];
}

export function DubaiCoverage({ locations }: DubaiCoverageProps) {
  const priorityLocations = locations.filter((l) => l.isPriority);

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Highway Corridor Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
              <img
                src={siteImages.dubaiCorridor.src}
                alt={siteImages.dubaiCorridor.alt}
                className="w-full h-full object-cover object-center filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-xs text-slate-200 font-medium flex items-center justify-between">
                <span>Sheikh Zayed & Al Khail Rapid Response</span>
                <span className="text-emerald-400 font-semibold">Priority Units On Call</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Corridor List */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">
              Response Grid
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Dubai Service Coverage
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We position mobile battery vans near key arterial hubs for honest, realistic response times. Whether parked in an underground residential basement or roadside, our technicians are equipped to access your vehicle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {priorityLocations.slice(0, 6).map((loc) => (
                <div key={loc.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                    <span>{loc.name}</span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-500">
                    ~{loc.estimatedEta}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/locations"
                className="text-xs font-bold text-slate-900 hover:text-sky-600 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View all Dubai service zones & notes</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
