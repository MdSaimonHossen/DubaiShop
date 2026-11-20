import React from 'react';
import Link from 'next/link';
import { ServiceLocation, SiteSettings } from '@/types';
import { MapPin, Clock, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { buildEmergencyWhatsAppUrl } from '@/lib/utils/whatsapp';

interface CoverageMapProps {
  locations: ServiceLocation[];
  settings: SiteSettings;
  onRequestModalOpen?: () => void;
}

export function CoverageMap({ locations, settings, onRequestModalOpen }: CoverageMapProps) {
  const priorityLocations = locations.filter((l) => l.isPriority);
  const secondaryLocations = locations.filter((l) => !l.isPriority);

  return (
    <section id="coverage" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
              Strategic Response Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Dubai Service Coverage Areas
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              To ensure honest, realistic arrival times, our service vans operate from key arterial corridors (Sheikh Zayed Road, Al Khail Road, Hessa Street). We only promise response times we can realistically execute.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">All Priority Zones Fully Active</span>
          </div>
        </div>

        {/* Priority Corridors Grid */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Priority Response Zones (Average ETA 15–30 Min)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {priorityLocations.map((loc) => (
              <div
                key={loc.id}
                className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 hover:border-sky-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
                    <h4 className="text-base font-bold text-white">{loc.name}</h4>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    ~{loc.estimatedEta}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{loc.districtName}</p>
                <p className="text-[11px] text-slate-500 italic">{loc.dispatchNote}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extended Dubai Zones Grid */}
        {secondaryLocations.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Extended Coverage Districts (Average ETA 30–45 Min)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {secondaryLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 text-xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-200">{loc.name}</span>
                    <span className="text-slate-400 text-[11px]">{loc.estimatedEta}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{loc.dispatchNote}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outside Area Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <h4 className="font-bold text-white text-sm">Parked elsewhere in Dubai or nearby emirates?</h4>
            <p className="text-slate-400 mt-1">
              Contact our dispatch team on WhatsApp. If our dedicated units cannot reach you within your timeline, we can coordinate with our vetted recovery and mobile partners.
            </p>
          </div>
          <a
            href={buildEmergencyWhatsAppUrl({
              whatsappNumber: settings.whatsappNumber,
              issue: 'Inquiry regarding coverage for custom location'
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shrink-0 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Check Custom Location</span>
          </a>
        </div>
      </div>
    </section>
  );
}
