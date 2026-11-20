'use client';

import React from 'react';
import { Activity, CheckSquare, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BatteryDiagnosticFlowProps {
  onRequestModalOpen?: () => void;
}

export function BatteryDiagnosticFlow({ onRequestModalOpen }: BatteryDiagnosticFlowProps) {
  const steps = [
    {
      step: '01',
      icon: Activity,
      title: 'Digital Health & Alternator Test',
      description: 'Our mobile technician connects a computerized conductance tester to evaluate Cold Cranking Amps (CCA), internal resistance, and starter draw. If your battery is simply discharged, we jump-start it and save you the cost of a replacement.'
    },
    {
      step: '02',
      icon: CheckSquare,
      title: 'Exact Vehicle OEM Specification',
      description: 'Modern European and GCC vehicles have strict electrical requirements. We verify whether your car requires an Absorbent Glass Mat (AGM), Enhanced Flooded Battery (EFB), or high-heat Sealed Maintenance-Free (SMF) unit.'
    },
    {
      step: '03',
      icon: Wrench,
      title: 'On-Site Installation & Memory Saver',
      description: 'We connect a 12V memory keeper to preserve your vehicle computer memory, clock, radio presets, and transmission adaptations. Terminals are cleaned, treated with anti-corrosion spray, and torqued to OEM standards.'
    },
    {
      step: '04',
      icon: ShieldCheck,
      title: 'ECU Battery Registration & Warranty',
      description: 'For vehicles equipped with Intelligent Battery Sensors (BMW, Mercedes, Audi, Porsche), we register the new battery via OBD2 scanner. Your official 12 to 24-month manufacturer warranty is activated on the spot.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container-custom">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-3">
            <span>Diagnostic-First Guarantee</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Battery Service That Tests Before It Replaces
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Replacing a car battery without testing is guesswork. In Dubai’s intense heat, starter motor faults or slipping alternator belts often mimic a dead battery. We ensure you only pay for what your car truly requires.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-sky-600 tracking-wider">
                      {item.step}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-sky-600" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Professional Protocol
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <Button
            variant="accent"
            size="lg"
            onClick={onRequestModalOpen}
            className="font-bold shadow-md"
          >
            <span>Book On-Site Battery Diagnosis</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
