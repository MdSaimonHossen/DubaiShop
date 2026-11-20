import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServices, getServiceBySlug, getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/meta';
import { buildEmergencyWhatsAppUrl } from '@/lib/utils/whatsapp';
import { siteImages } from '@/lib/images';
import { Clock, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, ChevronRight, Phone } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices(false);
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const settings = await getSettings();

  if (!service) {
    return { title: 'Service Not Found | Apex Auto Dubai' };
  }

  return {
    title: service.metaTitle || `${service.name} Dubai | Apex Auto`,
    description: service.metaDescription || service.shortDescription,
    openGraph: {
      title: `${service.name} in Dubai | Mobile On-Site Service`,
      description: service.shortDescription
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const settings = await getSettings();
  const allServices = await getServices();

  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(service, settings);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://apexbattery.ae' },
    { name: 'Services', url: 'https://apexbattery.ae/services' },
    { name: service.name, url: `https://apexbattery.ae/services/${service.slug}` }
  ]);

  const whatsappUrl = buildEmergencyWhatsAppUrl({
    whatsappNumber: settings.whatsappNumber,
    issue: `Inquiry regarding ${service.name}`
  });

  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-slate-100/60 border-b border-slate-200 py-3 text-xs text-slate-500">
          <div className="container-custom flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/services" className="hover:text-slate-900">Services</Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-900 truncate">{service.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-slate-950 text-white py-16 md:py-24 border-b border-slate-800">
          <div className="container-custom max-w-4xl space-y-5">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
              Mobile Automotive Service
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {service.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {service.tagline || service.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-400" />
                <span>Response Window: <strong className="text-white">{service.estimatedTime}</strong></span>
              </div>
              {service.warrantyInfo && (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>{service.warrantyInfo}</span>
                </div>
              )}
            </div>

            {/* Exactly One Primary Action + WhatsApp */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-md transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Request on WhatsApp</span>
              </a>

              <a
                href={`tel:${settings.phoneEmergency}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-lg font-semibold text-sm transition-colors"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                <span>Call Dispatch: {settings.phoneEmergency}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Content: What is it, What we do, Protocol */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <div className="container-custom max-w-4xl space-y-12">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Service Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                What Is Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {service.diagnosticSteps && service.diagnosticSteps.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-slate-900">
                  Step-by-Step Diagnostic Protocol
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {service.diagnosticSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-sky-600">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Other Services */}
            <div className="pt-6 border-t border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-4">
                Other Automotive Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherServices.map((other) => (
                  <Link
                    key={other.id}
                    href={`/services/${other.slug}`}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-400 transition-all text-left"
                  >
                    <span className="text-xs font-bold text-slate-900 block mb-1">{other.name}</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{other.shortDescription}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
      <StickyMobileBar settings={settings} />
    </>
  );
}
