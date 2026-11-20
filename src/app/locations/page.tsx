import { Metadata } from 'next';
import { getServiceLocations, getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { DubaiCoverage } from '@/components/sections/DubaiCoverage';
import { MinimalFinalCTA } from '@/components/sections/MinimalFinalCTA';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dubai Service Coverage & Response Times | Apex Auto',
  description: 'Active mobile response corridors across Dubai: Marina, Downtown, Business Bay, Al Barsha, JLT, Palm Jumeirah, Dubai Hills.'
};

export default async function LocationsPage() {
  const [locations, settings] = await Promise.all([
    getServiceLocations(),
    getSettings()
  ]);

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1">
        <section className="bg-slate-950 text-white py-16 md:py-24 border-b border-slate-800">
          <div className="container-custom max-w-3xl">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
              Strategic Dubai Dispatch Grid
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Dubai Coverage Areas
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              We position mobile battery response units near Dubai’s major transit corridors to ensure accurate, realistic arrival windows without false promises.
            </p>
          </div>
        </section>

        <DubaiCoverage locations={locations} />

        {/* All Districts Minimal Table */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="container-custom max-w-4xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              All Active Service Districts
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Coverage Communities</th>
                    <th className="py-3 px-4">Estimated Arrival</th>
                    <th className="py-3 px-4">Access Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {locations.map((loc) => (
                    <tr key={loc.id}>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {loc.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {loc.districtName}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-emerald-700">
                        ~{loc.estimatedEta}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px] italic">
                        {loc.dispatchNote}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <MinimalFinalCTA settings={settings} />
      </main>

      <Footer settings={settings} />
      <StickyMobileBar settings={settings} />
    </>
  );
}
