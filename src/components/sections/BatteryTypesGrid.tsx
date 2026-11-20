import React from 'react';
import { Battery, Zap, ShieldCheck, Flame } from 'lucide-react';

export function BatteryTypesGrid() {
  const types = [
    {
      title: 'AGM (Absorbent Glass Mat)',
      badge: 'Luxury & Start-Stop',
      icon: Zap,
      description: 'Absorbed glass fleece separators that deliver 3x cyclic endurance. Essential for modern European vehicles (BMW, Mercedes, Audi, Porsche) equipped with Intelligent Start-Stop and regenerative braking.',
      suitedFor: 'Vehicles with high parasitic electrical draws and automatic start-stop engines.'
    },
    {
      title: 'EFB (Enhanced Flooded Battery)',
      badge: 'Entry Start-Stop',
      icon: Battery,
      description: 'Improved polyfleece scrim plates offering twice the cyclic resistance of standard flooded batteries. Common in modern Japanese and Korean micro-hybrids (Mazda, Nissan, Toyota).',
      suitedFor: 'Cars with basic start-stop systems or heavy daily urban driving.'
    },
    {
      title: 'SMF (Sealed Maintenance Free)',
      badge: 'GCC High-Heat Spec',
      icon: Flame,
      description: 'Hermetically sealed calcium-silver alloy batteries engineered specifically to minimize electrolyte water loss in Dubai summer temperatures exceeding 50°C.',
      suitedFor: 'Most standard Japanese, American, and Asian sedans & SUVs (Land Cruiser, Patrol, Camry).'
    },
    {
      title: 'Commercial Heavy-Duty',
      badge: 'Fleets & 4x4 Off-Road',
      icon: ShieldCheck,
      description: 'Reinforced plate anchors, high Cold Cranking Amps (up to 1000 CCA), and rugged vibration-resistant casing for fleet vans, pickup trucks, and modified desert overland vehicles.',
      suitedFor: 'Delivery vans, pickup trucks, and dual-battery off-road rigs.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            Technical Education
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Understanding Modern Battery Technologies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Installing the wrong battery technology in a modern vehicle triggers alternator errors and invalidates warranties. Here is how we match your car:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold text-sky-700 bg-sky-100/80 px-2.5 py-1 rounded-full">
                      {t.badge}
                    </span>
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {t.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Best Suited For:</span>
                  <span className="text-xs text-slate-800 font-medium">{t.suitedFor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
