import { Metadata } from 'next';
import { getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';

export const metadata: Metadata = {
  title: 'Terms of Service & Battery Warranty Policy | Apex Auto Dubai',
  description: 'Terms of service, mobile technician dispatch conditions, on-site payment terms, and official battery manufacturer warranty claim guidelines in Dubai.'
};

export default async function TermsPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1 py-16 bg-white">
        <div className="container-custom max-w-3xl space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service & Warranty Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: November 2026</p>

          <p>
            By requesting mobile car battery replacement, jump-start assistance, or roadside automotive services from <strong>{settings.companyName}</strong>, you agree to the operational and warranty terms outlined below.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">1. On-Site Service & Arrival Estimates</h2>
          <p>
            Arrival times provided via phone or WhatsApp are realistic estimates based on prevailing traffic conditions along major Dubai transit arteries (Sheikh Zayed Road, Al Khail Road, Hessa Street). Road accidents, adverse weather, or gated community access delays may affect exact arrival times. Our dispatchers provide continuous updates.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">2. Diagnostic-First Protocol</h2>
          <p>
            Our technicians will perform digital load conductance testing on your battery and alternator prior to installing a replacement. If the battery is found to be functional but discharged due to auxiliary power drain, a safe jump-start service will be recommended at standard roadside rates.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">3. Official Battery Warranty Terms</h2>
          <p>
            All genuine automotive batteries supplied by {settings.companyName} carry an official manufacturer warranty (typically 12, 18, or 24 months depending on the specific brand and model):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Coverage:</strong> Covers internal cell failure, manufacturing defects, and premature loss of charging retention under standard vehicle operational use.</li>
            <li><strong>Exclusions:</strong> Does not cover physical damage to the battery casing, melted terminals caused by external short circuits, or prolonged deep discharge resulting from severe alternator malfunction or parasitic drains.</li>
            <li><strong>Claim Process:</strong> In the event of battery failure within the warranty period, our mobile unit will test the battery on-site. If validated as a defective unit under warranty terms, a direct replacement is installed.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-4">4. Payment Terms</h2>
          <p>
            We do not require advance online payment. Payment is due upon completion of testing and installation via mobile wireless POS terminal (Visa, Mastercard, Apple Pay, Google Pay) or cash directly to the technician.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">5. Old Battery Recycling</h2>
          <p>
            To prevent hazardous environmental pollution in the UAE, the technician will safely remove and retain your old depleted lead-acid battery for certified recycling unless explicitly instructed otherwise.
          </p>
        </div>
      </main>

      <Footer settings={settings} />
      <StickyMobileBar settings={settings} />
    </>
  );
}
