'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BatteryComparison() {
  const types = [
    {
      name: 'Standard SMF',
      subtitle: 'Sealed Maintenance Free',
      description: 'Hermetically sealed calcium-silver alloy design engineered to minimize electrolyte loss in high Dubai heat.',
      idealFor: 'Standard Asian and GCC sedans & SUVs (Toyota, Nissan, Honda, Lexus).'
    },
    {
      name: 'EFB Technology',
      subtitle: 'Enhanced Flooded Battery',
      description: 'Reinforced polyfleece scrim with 2x cyclic endurance compared to conventional flooded batteries.',
      idealFor: 'Entry-level Start-Stop systems and heavy daily urban commuting.'
    },
    {
      name: 'AGM Start-Stop',
      subtitle: 'Absorbent Glass Mat',
      description: 'Absorbed glass fleece delivering 3x cyclic endurance. Handles high parasitic draws and brake energy regeneration.',
      idealFor: 'European luxury and intelligent Start-Stop vehicles (BMW, Mercedes, Audi, Porsche).'
    }
  ];

  const brands = ['VARTA', 'Amaron', 'Bosch', 'ACDelco', 'Solite'];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
              Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Battery Options for Every Vehicle
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Modern vehicles have strict electrical specifications. We match the exact technology your car was engineered for.
            </p>
          </div>

          <Link
            href="/batteries"
            className="text-xs font-bold text-slate-900 hover:text-sky-600 inline-flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Explore full battery catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3 Column Clean Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((t, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-sky-700 uppercase block mb-1">
                  {t.subtitle}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {t.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.description}
              </p>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-700">
                <span className="text-slate-400 block mb-0.5 text-[11px] font-medium">Recommended for:</span>
                <span className="font-semibold text-slate-900">{t.idealFor}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Brands Row */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Approved genuine brands in stock:</span>
          <div className="flex flex-wrap items-center gap-6 font-bold text-slate-800 tracking-wide">
            {brands.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
