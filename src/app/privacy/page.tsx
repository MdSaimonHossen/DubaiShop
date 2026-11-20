import { Metadata } from 'next';
import { getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';

export const metadata: Metadata = {
  title: 'Privacy Policy | Apex Auto Dubai',
  description: 'Privacy Policy regarding customer contact information, WhatsApp communications, and location data collection for mobile automotive dispatch.'
};

export default async function PrivacyPage() {
  const settings = await getSettings();

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1 py-16 bg-white">
        <div className="container-custom max-w-3xl space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: November 2026</p>

          <p>
            This Privacy Policy describes how <strong>{settings.companyName}</strong> collects, uses, and safeguards customer information when requesting mobile car battery replacement, vehicle diagnostics, or emergency roadside assistance within the Emirate of Dubai, UAE.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">1. Information We Collect</h2>
          <p>
            When you request automotive assistance through our website, phone hotline, or WhatsApp Business channel, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Your name and contact phone number.</li>
            <li>Vehicle make, model, year, and reported mechanical/battery symptoms.</li>
            <li>GPS coordinates, landmark descriptions, or live WhatsApp location pins to enable technician dispatch.</li>
            <li>Invoices and warranty activation records associated with installed batteries.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-4">2. Purpose of Processing</h2>
          <p>
            Your information is used strictly to dispatch mobile service technicians, confirm vehicle battery specifications, provide official manufacturer warranty documentation, and communicate order updates. We do not sell or rent customer data to third-party marketing entities.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">3. Data Security & Storage</h2>
          <p>
            We implement industry-standard organizational and technical measures to protect customer data. Dispatch records and warranty logs are stored securely and accessed only by authorized personnel for customer support and warranty verification.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">4. Contact Information</h2>
          <p>
            For any inquiries regarding your privacy or personal information, please contact our team at{' '}
            <a href={`mailto:${settings.emailPrimary}`} className="text-sky-600 underline">
              {settings.emailPrimary}
            </a>.
          </p>
        </div>
      </main>

      <Footer settings={settings} />
      <StickyMobileBar settings={settings} />
    </>
  );
}
