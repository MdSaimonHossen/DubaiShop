'use client';

import React from 'react';
import { ShieldCheck, BatteryCharging, Wrench, RefreshCw } from 'lucide-react';

export function TrustStrip() {
  const points = [
    {
      title: 'Digital Testing First',
      desc: 'We verify Cold Cranking Amps & alternator output before replacing.'
    },
    {
      title: 'Direct Mobile Dispatch',
      desc: 'Technician arrives at your home, office parking, or roadside.'
    },
    {
      title: '12–24 Months Warranty',
      desc: 'Official manufacturer warranties with digital registration.'
    },
    {
      title: 'Certified Recycling',
      desc: 'Depleted lead-acid batteries safely reclaimed under Dubai standards.'
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((p, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600 inline-block" />
                <span>{p.title}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-3">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
