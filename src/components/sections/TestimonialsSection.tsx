import React from 'react';
import { Testimonial } from '@/types';
import { Star, ShieldCheck, Car, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils/format';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Feedback from Dubai Motorists
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Real encounters from emergency basement breakdowns, honest diagnostic checks, and warranty-backed battery replacements across Dubai communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-sm transition-shadow"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  {t.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "{t.reviewText}"
                </p>
              </div>

              {/* Author & Vehicle Details */}
              <div className="pt-4 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.customerName}</h4>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                      <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                      <span>{t.district}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{formatDate(t.date)}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                    <Car className="h-3 w-3 text-sky-600" />
                    <span>{t.vehicle}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-medium">
                    {t.serviceUsed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
