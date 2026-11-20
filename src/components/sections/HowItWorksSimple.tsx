'use client';

import React from 'react';

export function HowItWorksSimple() {
  const steps = [
    {
      num: '01',
      title: 'Diagnose',
      desc: 'We check the battery health, Cold Cranking Amps, and charging system on-site.'
    },
    {
      num: '02',
      title: 'Confirm',
      desc: 'You approve the recommended battery specifications and transparent price.'
    },
    {
      num: '03',
      title: 'Install',
      desc: 'Our technician completes the installation with memory saver and warranty activation.'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            The Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Three straightforward steps from stranded to driving again.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((s, idx) => (
            <div key={idx} className="space-y-2 border-t-2 border-slate-900 pt-5">
              <span className="text-xs font-mono font-bold text-sky-600 tracking-wider">
                {s.num}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
