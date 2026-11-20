'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  BatteryCharging,
  Activity,
  Zap,
  ShieldAlert,
  Cpu,
  Disc,
  Wind,
  Wrench,
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface ServicesGridProps {
  services: ServiceItem[];
  onRequestModalOpen?: (serviceName: string) => void;
}

export function ServicesGrid({ services, onRequestModalOpen }: ServicesGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BatteryCharging': return BatteryCharging;
      case 'Activity': return Activity;
      case 'Zap': return Zap;
      case 'ShieldAlert': return ShieldAlert;
      case 'Cpu': return Cpu;
      case 'Disc': return Disc;
      case 'Wind': return Wind;
      default: return Wrench;
    }
  };

  // Separate hero battery service from expansion services
  const heroBatteryService = services.find((s) => s.slug === 'car-battery-replacement') || services[0];
  const otherServices = services.filter((s) => s.id !== heroBatteryService?.id);

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="container-custom">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" className="mb-3">
            Mobile Automotive Solutions
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive On-Site Vehicle Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            While car battery replacement is our flagship commercial offering, our mobile service fleet handles critical roadside breakdown triage and preventive diagnostics across Dubai.
          </p>
        </div>

        {/* Hero Battery Replacement Service Card (Visually Dominant) */}
        {heroBatteryService && (
          <div className="mb-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30">
                  <BatteryCharging className="h-4 w-4" />
                  <span>Flagship On-Site Automotive Service</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {heroBatteryService.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {heroBatteryService.shortDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {heroBatteryService.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Response Window:</span>
                    <span className="font-semibold text-white">{heroBatteryService.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Warranty:</span>
                    <span className="font-semibold text-emerald-400">{heroBatteryService.warrantyInfo}</span>
                  </div>
                </div>

                <Button
                  variant="accent"
                  size="md"
                  onClick={() => onRequestModalOpen && onRequestModalOpen(heroBatteryService.name)}
                  className="w-full font-bold shadow-md"
                >
                  <span>Book Battery Replacement</span>
                </Button>

                <Link
                  href={`/services/${heroBatteryService.slug}`}
                  className="text-center text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  View Full Service & Diagnostic Details →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Services Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            More Ways We Keep Your Vehicle Moving
          </h3>
          <Link href="/services" className="text-xs font-semibold text-sky-600 hover:underline">
            View All Services
          </Link>
        </div>

        {/* Other Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-sky-600" />
                    </div>
                    {service.isEmergency ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Roadside Ready
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                        On-Site Appointment
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1.5">
                    {service.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pt-3 border-t border-slate-100">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{service.estimatedTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRequestModalOpen && onRequestModalOpen(service.name)}
                      className="w-full text-xs font-semibold"
                    >
                      <span>Request Service</span>
                    </Button>
                    <Link
                      href={`/services/${service.slug}`}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Learn more"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
