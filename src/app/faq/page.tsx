import { Metadata } from 'next';
import { getFAQs, getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { MinimalFAQ } from '@/components/sections/MinimalFAQ';
import { MinimalFinalCTA } from '@/components/sections/MinimalFinalCTA';
import { generateFaqSchema } from '@/lib/seo/meta';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Dubai Car Battery & Roadside Care',
  description: 'Common questions regarding battery lifespans in UAE heat, AGM vs SMF technologies, warranty claims, and mobile technician response times across Dubai.'
};

export default async function FAQPage() {
  const [faqs, settings] = await Promise.all([
    getFAQs(),
    getSettings()
  ]);

  const faqSchema = generateFaqSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar settings={settings} />

      <main className="flex-1">
        <section className="bg-slate-950 text-white py-16 sm:py-20 border-b border-slate-800">
          <div className="container-custom max-w-3xl">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
              Knowledge Base
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Dubai Battery & Service FAQs
            </h1>
            <p className="mt-3 text-base text-slate-400 leading-relaxed">
              Clear, transparent answers about mobile dispatch times, warranty terms, and high-temperature battery degradation.
            </p>
          </div>
        </section>

        <MinimalFAQ
          faqs={faqs}
          settings={settings}
          title="Frequently asked questions."
          subtitle="Everything you need to know about our mobile diagnostics, warranty fulfillment, and Dubai response times."
          limit={100}
        />

        <MinimalFinalCTA settings={settings} />
      </main>

      <Footer settings={settings} />
      <StickyMobileBar settings={settings} />
    </>
  );
}
