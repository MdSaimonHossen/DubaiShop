import React from 'react';
import { PhoneCall, MapPin, CheckCircle, Car } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: PhoneCall,
      title: 'Contact Our Dispatcher',
      desc: 'Call our emergency hotline or tap WhatsApp to initiate on-site assistance immediately.'
    },
    {
      num: '02',
      icon: MapPin,
      title: 'Share Location & Vehicle Info',
      desc: 'Drop your live WhatsApp pin and tell us your car make, model, and year.'
    },
    {
      num: '03',
      icon: CheckCircle,
      title: 'Specification & Price Confirmation',
      desc: 'We confirm genuine battery availability (AGM/EFB/SMF), estimated arrival time, and transparent price.'
    },
    {
      num: '04',
      icon: Car,
      title: 'On-Site Diagnostic & Installation',
      desc: 'Technician tests your system, installs the new battery with memory saver, and validates charging.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
            Seamless Dubai Roadside Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            How Our Mobile Service Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            From the moment your car clicks to driving again, our process is built for clarity and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-sky-400 tracking-wider">
                      {item.num}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-slate-700/80 text-sky-300 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400">
                  Step {index + 1} of 4
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
