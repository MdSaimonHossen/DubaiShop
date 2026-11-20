import { Metadata } from 'next';
import { getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { MinimalFinalCTA } from '@/components/sections/MinimalFinalCTA';
import { siteImages } from '@/lib/images';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Mobile Automotive Service Dubai | Apex Auto',
  description: 'Our diagnostic-first mobile battery replacement and roadside assistance standard in Dubai. Testing before replacing, genuine warranties, and certified recycling.'
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-950 text-white py-16 md:py-24 border-b border-slate-800">
          <div className="container-custom max-w-3xl space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
              Our Principles
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              About Apex Auto
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              We make vehicle battery and roadside assistance simple, fast, and transparent across Dubai.
            </p>
          </div>
        </section>

        {/* Narrative & Workshop Imagery */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-200">
          <div className="container-custom max-w-4xl space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Testing before replacing.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Most roadside breakdowns in Dubai are treated as quick battery sales. But sudden no-starts are frequently caused by an alternator diode failure, a slipping belt, or a minor parasitic drain from a forgotten dashcam.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  We equipped our mobile vans with computerized conductance meters and OBD2 diagnostic scanners. We test your battery’s actual Cold Cranking Amps and alternator charging voltage before unbolting any terminals. If the battery is healthy, we jump-start it and explain what happened.
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 shadow-md">
                  <img
                    src={siteImages.workshop.src}
                    alt={siteImages.workshop.alt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Standards */}
            <div className="border-t border-slate-200 pt-12 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Operating Standards
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 mb-0.5">Memory Savers on Every Job</strong>
                    <span>Plugs into your OBD2 port to preserve digital clock, radio, and transmission settings.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 mb-0.5">BMS Battery Registration</strong>
                    <span>Resets charging profiles for BMW, Mercedes, and European Start-Stop micro-hybrids.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 mb-0.5">Official 12–24 Month Warranties</strong>
                    <span>Manufacturer warranty cards and digital records sent directly to your WhatsApp.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 mb-0.5">Certified Dubai Battery Recycling</strong>
                    <span>Depleted lead-acid units reclaimed under Dubai environmental protection guidelines.</span>
                  </div>
                </div>
              </div>
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
