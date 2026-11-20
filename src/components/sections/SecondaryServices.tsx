'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench, ShieldAlert, Cpu, Disc, Wind, Zap } from 'lucide-react';
import { ServiceItem } from '@/types';

interface SecondaryServicesProps {
  services: ServiceItem[];
}

export function SecondaryServices({ services }: SecondaryServicesProps) {
  // Filter out the hero battery replacement service so secondary services don't repeat it
  const supportingServices = services.filter((s) => s.slug !== 'car-battery-replacement').slice(0, 5);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return Zap;
      case 'ShieldAlert': return ShieldAlert;
      case 'Cpu': return Cpu;
      case 'Disc': return Disc;
      case 'Wind': return Wind;
      default: return Wrench;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
              Expanding Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Other Automotive Services
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Essential mobile roadside assistance and vehicle diagnostics to support your vehicle across Dubai.
            </p>
          </div>

          <Link
            href="/services"
            className="text-xs font-bold text-slate-900 hover:text-sky-600 inline-flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>View all automotive services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Clean Editorial List with Zero Button Overload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportingServices.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {service.estimatedTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-sky-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-sky-600">
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
