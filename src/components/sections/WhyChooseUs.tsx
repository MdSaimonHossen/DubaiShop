import React from 'react';
import { Truck, Cpu, ShieldCheck, MessageSquare, Wrench, RefreshCw } from 'lucide-react';

export function WhyChooseUs() {
  const points = [
    {
      icon: Truck,
      title: 'Mobile Service Directly to You',
      desc: 'No towing fees or arranging taxi rides. Whether parked at your residential villa, office basement, or highway shoulder, our equipped van comes to you.'
    },
    {
      icon: Cpu,
      title: 'Digital Testing & ECU Registration',
      desc: 'We use calibrated conductance testers and diagnostic scanners to ensure correct battery matching and reset alternator charging profiles (BMS) for luxury cars.'
    },
    {
      icon: ShieldCheck,
      title: 'Official Manufacturer Warranty',
      desc: '12 to 24 months official replacement warranty with immediate digital invoice registration on WhatsApp for seamless future claims across Dubai.'
    },
    {
      icon: MessageSquare,
      title: 'Frictionless WhatsApp Dispatch',
      desc: 'Drop your live location pin on WhatsApp with your car make, and our coordinator confirms technician arrival time and pricing in minutes.'
    },
    {
      icon: Wrench,
      title: 'Electronics & Memory Protection',
      desc: 'We plug memory savers into your OBD2 port before removing old battery terminals, preserving radio stations, navigation data, and engine adaptation settings.'
    },
    {
      icon: RefreshCw,
      title: 'Compliant Battery Recycling',
      desc: 'Old depleted lead-acid batteries are safely removed and delivered to Dubai Municipality-approved reclamation facilities to protect UAE soil and groundwater.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            The Professional Difference
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Dubai Drivers Rely on Our Service
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Automotive maintenance built around transparency, calibrated diagnostic tools, and authentic warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
