'use client';

import React, { useState } from 'react';
import { Testimonial } from '@/types';
import { Star, ShieldCheck, Car, MapPin, Quote, ChevronRight } from 'lucide-react';

interface EditorialTestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export function EditorialTestimonials({
  testimonials,
  title = 'Trusted by drivers across Dubai',
  subtitle = 'Real encounters from emergency basement breakdowns, honest diagnostic checks, and warranty-backed battery replacements.'
}: EditorialTestimonialsProps) {
  // Only display published/active testimonials
  const activeList = testimonials.filter((t) => t.isActive);

  if (!activeList || activeList.length === 0) {
    return null;
  }

  // Find index of first featured testimonial, or default to 0
  const initialFeaturedIndex = activeList.findIndex((t) => t.isFeatured);
  const [selectedIndex, setSelectedIndex] = useState(
    initialFeaturedIndex >= 0 ? initialFeaturedIndex : 0
  );

  const featured = activeList[selectedIndex] || activeList[0];

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2.5">
            Verified Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Editorial Layout: Large Featured Story + Supporting Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Dominant Featured Quote (Option B Editorial) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-xs relative flex flex-col justify-between min-h-[380px]">
            {/* Subtle Top Accent */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1.5 text-amber-500">
                {[...Array(featured.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {featured.isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Verified Service Record</span>
                </span>
              )}
            </div>

            {/* Large Typography Quotation */}
            <div className="my-auto relative">
              <Quote className="h-10 w-10 text-slate-200/80 absolute -top-4 -left-2 -z-0 pointer-events-none" />
              <blockquote className="relative z-10 text-xl sm:text-2xl font-medium text-slate-900 leading-snug tracking-tight">
                "{featured.reviewText}"
              </blockquote>
            </div>

            {/* Author Attribution & Vehicle Details */}
            <div className="pt-8 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-base text-slate-900">{featured.customerName}</div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                    <Car className="h-3.5 w-3.5 text-sky-600" />
                    <span>{featured.vehicle}</span>
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{featured.district}</span>
                  </span>
                </div>
              </div>

              {featured.serviceUsed && (
                <span className="self-start sm:self-auto text-xs font-medium text-sky-800 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
                  {featured.serviceUsed}
                </span>
              )}
            </div>
          </div>

          {/* Supporting Testimonial Stories (Side Column) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
              Select Client Encounter
            </div>

            {activeList.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all text-xs flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white border-sky-600 shadow-xs ring-1 ring-sky-600'
                      : 'bg-white/60 hover:bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${isSelected ? 'text-sky-950' : 'text-slate-800'}`}>
                        {item.customerName}
                      </span>
                      <span className="text-slate-400 text-[11px]">•</span>
                      <span className="text-slate-500 text-[11px] font-medium">{item.district}</span>
                    </div>

                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                      "{item.reviewText}"
                    </p>

                    <div className="flex items-center gap-2 pt-0.5 text-[11px] text-slate-500 font-mono">
                      <span>{item.vehicle}</span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? 'text-sky-600 translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
