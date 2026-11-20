import { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { MinimalFinalCTA } from '@/components/sections/MinimalFinalCTA';
import { ArrowRight, Wrench, BatteryCharging, Zap, ShieldAlert, Cpu, Disc, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Automotive & Mobile Roadside Services Dubai | Apex Auto',
  description: 'On-site car battery replacement, battery diagnostics, emergency jump-start assistance, vehicle computer scanning, and roadside support across Dubai.'
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSettings()
  ]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BatteryCharging': return BatteryCharging;
      case 'Zap': return Zap;
      case 'ShieldAlert': return ShieldAlert;
      case 'Cpu': return Cpu;
      case 'Disc': return Disc;
      case 'Wind': return Wind;
      default: return Wrench;
    }
  };

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-950 text-white py-16 md:py-24 border-b border-slate-800">
          <div className="container-custom max-w-3xl">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
              Mobile Automotive Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Our Services
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              We bring professional diagnostic equipment, certified technicians, and genuine OEM parts directly to your parking spot in Dubai.
            </p>
          </div>
        </section>

        {/* Clean Service List with Zero Button Clutter */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="container-custom max-w-4xl space-y-6">
            {services.map((service, index) => {
              const Icon = getIcon(service.iconName);
              const isHero = service.slug === 'car-battery-replacement';

              return (
                <div
                  key={service.id}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                    isHero
                      ? 'bg-slate-900 text-white border-slate-800 shadow-md'
                      : 'bg-slate-50 text-slate-900 border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
                          isHero ? 'bg-sky-500/20 text-sky-400' : 'bg-white text-slate-800 border border-slate-200 shadow-xs'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-lg font-bold tracking-tight ${isHero ? 'text-white' : 'text-slate-900'}`}>
                            {service.name}
                          </h3>
                          {isHero && (
                            <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              Flagship Service
                            </span>
                          )}
                        </div>

                        <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${isHero ? 'text-slate-300' : 'text-slate-600'}`}>
                          {service.shortDescription}
                        </p>

                        <div className="pt-2 flex items-center gap-4 text-xs">
                          <span className={isHero ? 'text-slate-400' : 'text-slate-500'}>
                            Arrival: <strong className={isHero ? 'text-white' : 'text-slate-800'}>{service.estimatedTime}</strong>
                          </span>
                          {service.warrantyInfo && (
                            <span className="text-emerald-500 font-medium">
                              {service.warrantyInfo}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="sm:self-center shrink-0 pt-2 sm:pt-0">
                      <Link
                        href={`/services/${service.slug}`}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors ${
                          isHero
                            ? 'bg-sky-600 hover:bg-sky-500 text-white'
                            : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-300'
                        }`}
                      >
                        <span>View details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <MinimalFinalCTA settings={settings} />
      </main>

      <Footer settings={settings} />
      <StickyMobileBar settings={settings} />
    </>
  );
}
