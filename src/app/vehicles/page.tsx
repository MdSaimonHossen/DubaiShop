import { Metadata } from 'next';
import Link from 'next/link';
import { getVehicleBrands, getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { VehicleCompatibility } from '@/components/sections/VehicleCompatibility';
import { EmergencyCTA } from '@/components/sections/EmergencyCTA';
import { ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compatible Vehicle Makes & Battery Specifications Dubai | Apex Auto',
  description: 'Battery specifications, AGM requirements, and computer battery registration guidelines for Japanese, European, American, Korean, and Luxury vehicles in Dubai.'
};

export default async function VehiclesPage() {
  const [vehicles, settings] = await Promise.all([
    getVehicleBrands(),
    getSettings()
  ]);

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
          <div className="container-custom">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
              Vehicle-Specific Engineering
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Vehicle Compatibility & Specifications
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Modern vehicles are complex electrical ecosystems. We stock exact OEM specifications—from heavy-duty calcium batteries for Land Cruisers to dedicated AGM units for BMW and Mercedes requiring computerized BMS battery registration.
            </p>
          </div>
        </section>

        {/* Specialized Tech Advisory */}
        <section className="bg-sky-50/70 border-b border-sky-100 py-8">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3.5 bg-white p-5 rounded-2xl border border-sky-100">
                <Cpu className="h-6 w-6 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    European Intelligent Battery Sensors (IBS)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vehicles from BMW, Mercedes-Benz, Audi, and Porsche utilize Intelligent Battery Sensors that adjust alternator charging voltage as a battery ages. When replacing, our technicians perform on-site OBD2 diagnostic registration to prevent premature overcharging.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-5 rounded-2xl border border-sky-100">
                <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Japanese & GCC High-Heat Vibration Resistance
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    SUVs like the Toyota Land Cruiser, Nissan Patrol, and Lexus LX570 demand high reserve capacity to sustain desert climate air conditioning and large displacement starters. We install heavy-duty sealed units with reinforced plates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <VehicleCompatibility vehicles={vehicles} />

        <EmergencyCTA settings={settings} />
      </main>

      <Footer settings={settings} />
      <StickyMobileBar settings={settings} />
    </>
  );
}
