import { Metadata } from 'next';
import { getSettings } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';
import { Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { buildGeneralInquiryWhatsAppUrl } from '@/lib/utils/whatsapp';

export const metadata: Metadata = {
  title: 'Contact Mobile Battery Dispatch Dubai | Apex Auto',
  description: 'Reach our Dubai mobile battery dispatch team via Phone, WhatsApp, or online quote request. Fast emergency response across Dubai.'
};

export default async function ContactPage() {
  const settings = await getSettings();
  const whatsappUrl = buildGeneralInquiryWhatsAppUrl(settings.whatsappNumber, 'roadside service inquiry');

  return (
    <>
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
          <div className="container-custom">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
              Fast Response Coordination
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Contact Our Dispatch Team
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Stranded right now or scheduling a battery replacement at your office? Reach out directly via phone, WhatsApp, or through our dispatch coordinator.
            </p>
          </div>
        </section>

        {/* Contact Info & Direct Channels */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Direct Fast Channels */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Emergency Dispatch Numbers
                  </h2>
                  <p className="text-sm text-slate-600">
                    For immediate breakdown assistance in Dubai, calling or sending a live WhatsApp location is the fastest method.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Emergency Phone Card */}
                  <a
                    href={`tel:${settings.phoneEmergency}`}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 transition-colors shadow-md group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                        24/7 Priority Emergency Line
                      </span>
                      <strong className="text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                        {settings.phoneEmergency}
                      </strong>
                    </div>
                  </a>

                  {/* WhatsApp Live Location Card */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-md group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider block">
                        WhatsApp Live Location Dispatch
                      </span>
                      <strong className="text-xl font-bold tracking-tight text-white">
                        {settings.whatsappNumber}
                      </strong>
                    </div>
                  </a>
                </div>

                {/* Operational Details */}
                <div className="pt-6 border-t border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold mb-0.5">Primary Logistics & Depot Location</strong>
                      <span>{settings.addressText}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold mb-0.5">Mobile Response Operating Hours</strong>
                      <span>{settings.workingHours}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-semibold mb-0.5">General & Corporate Inquiries</strong>
                      <span>{settings.emailPrimary}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: General Message / Quote Card */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Request a Formal Quotation
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Need a planned battery replacement or corporate fleet consultation? Send us your vehicle details.
                </p>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <ShieldCheck className="h-4 w-4 text-sky-700" />
                      <span>Direct Technician Assistance</span>
                    </div>
                    <p className="leading-relaxed">
                      For fastest response, we recommend messaging our WhatsApp coordinator with a quick photo of your battery label or vehicle registration (Mulkiya).
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Start WhatsApp Conversation</span>
                    </a>

                    <a
                      href={`tel:${settings.phonePrimary}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-colors"
                    >
                      <Phone className="h-4 w-4 text-amber-400" />
                      <span>Call Office: {settings.phonePrimary}</span>
                    </a>
                  </div>
                </div>
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
