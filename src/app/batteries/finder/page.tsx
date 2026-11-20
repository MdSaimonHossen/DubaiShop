import { Metadata } from 'next';
import { getVehicleBrands, getBatteryProducts, getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { SmartBatteryFinder } from '@/components/sections/SmartBatteryFinder';
import { EmergencyCTA } from '@/components/sections/EmergencyCTA';

export const metadata: Metadata = {
  title: 'Smart Vehicle Battery Matcher Dubai | Apex Auto',
  description: 'Select your vehicle make, model, and year to find recommended battery options, Cold Cranking Amps, and AGM requirements for Dubai climate.'
};

export default async function BatteryFinderPage() {
  const [vehicles, batteries, settings] = await Promise.all([
    getVehicleBrands(),
    getBatteryProducts(),
    getSettings()
  ]);

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1">
        <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
          <div className="container-custom text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
              Interactive Fitment Guide
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Vehicle Battery Finder
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Ensure you get the exact Cold Cranking Amps, terminal layout, and start-stop technology needed for your car in Dubai.
            </p>
          </div>
        </section>

        <SmartBatteryFinder
          vehicles={vehicles}
          batteries={batteries}
          settings={settings}
        />

        <EmergencyCTA settings={settings} />
      </main>

      <Footer settings={settings} />
      <StickyMobileBar settings={settings} />
    </>
  );
}
