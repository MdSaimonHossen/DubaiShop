import { Metadata } from 'next';
import Link from 'next/link';
import { getBatteryProducts, getBatteryBrands, getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { MinimalFinalCTA } from '@/components/sections/MinimalFinalCTA';
import { formatAed } from '@/lib/utils/format';
import { buildBatteryQuoteWhatsAppUrl } from '@/lib/utils/whatsapp';
import { Shield, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Batteries Catalog Dubai | Genuine Varta, Amaron, Bosch, ACDelco',
  description: 'Genuine automotive batteries in Dubai. High-heat SMF, AGM start-stop, and commercial heavy-duty batteries with on-site installation and official warranty.'
};

export default async function BatteriesPage() {
  const [batteries, brands, settings] = await Promise.all([
    getBatteryProducts(),
    getBatteryBrands(),
    getSettings()
  ]);

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-950 text-white py-16 md:py-24 border-b border-slate-800">
          <div className="container-custom max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
                  High-Heat GCC Specifications
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Car Batteries
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  Factory-fresh automotive batteries engineered for Dubai summer heat. Every installation includes digital testing and certified old battery disposal.
                </p>
              </div>

              <Link
                href="/batteries/finder"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-950 hover:bg-slate-100 rounded-lg text-xs font-bold shrink-0 transition-colors"
              >
                <span>Launch Battery Matcher</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Brands Strip */}
        <section className="bg-slate-50 border-b border-slate-200 py-6 text-xs text-slate-600">
          <div className="container-custom max-w-4xl flex flex-wrap items-center justify-between gap-4">
            <span className="font-semibold text-slate-800">Approved Manufacturers:</span>
            <div className="flex flex-wrap items-center gap-6 font-bold text-slate-900 tracking-wide">
              {brands.map((b) => (
                <span key={b.id}>{b.name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Clean Battery List */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="container-custom max-w-4xl space-y-6">
            {batteries.map((battery) => {
              const quoteUrl = buildBatteryQuoteWhatsAppUrl({
                whatsappNumber: settings.whatsappNumber,
                batteryName: `${battery.brandName} ${battery.modelNumber} (${battery.batteryType})`
              });

              return (
                <div
                  key={battery.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                        {battery.batteryType}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <Shield className="h-3.5 w-3.5" />
                        <span>{battery.warrantyMonths} Mo Warranty</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {battery.brandName} {battery.modelNumber}
                    </h3>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-700">
                      <span><strong>{battery.capacityAh} Ah</strong> Capacity</span>
                      <span>•</span>
                      <span><strong>{battery.coldCrankingAmps} CCA</strong> Cranking</span>
                      <span>•</span>
                      <span className="text-slate-400">{battery.dimensionsMm}</span>
                    </div>

                    <div className="pt-1 text-xs text-slate-500">
                      <span>Suited for: {battery.recommendedFor.join(', ')}</span>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 space-y-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Installed at your location</span>
                      <strong className="text-xl font-black text-slate-900 block">
                        {battery.showPrice ? formatAed(battery.priceAed) : 'Quote on Request'}
                      </strong>
                    </div>

                    <a
                      href={quoteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Request Quote on WhatsApp</span>
                    </a>
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
