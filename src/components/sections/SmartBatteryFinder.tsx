'use client';

import React, { useState } from 'react';
import { VehicleBrand, BatteryProduct, SiteSettings } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BatteryCharging, CheckCircle, MessageSquare, Wrench, Shield, ArrowRight } from 'lucide-react';
import { buildBatteryQuoteWhatsAppUrl } from '@/lib/utils/whatsapp';
import { formatAed } from '@/lib/utils/format';

interface SmartBatteryFinderProps {
  vehicles: VehicleBrand[];
  batteries: BatteryProduct[];
  settings: SiteSettings;
  onRequestModalOpen?: () => void;
}

export function SmartBatteryFinder({ vehicles, batteries, settings, onRequestModalOpen }: SmartBatteryFinderProps) {
  const [selectedBrandId, setSelectedBrandId] = useState<string>(vehicles[0]?.id || '');
  const [selectedModelName, setSelectedModelName] = useState<string>('');

  const currentBrand = vehicles.find((v) => v.id === selectedBrandId) || vehicles[0];
  const models = currentBrand?.models || [];
  const activeModel = models.find((m) => m.name === selectedModelName) || models[0];

  // Match battery products matching the active model's batteryType or capacity
  const matchedBatteries = batteries.filter((b) => {
    if (!activeModel) return true;
    return b.batteryType === activeModel.batteryType || b.recommendedFor.some((r) => r.toLowerCase().includes(currentBrand.name.toLowerCase()));
  }).slice(0, 3);

  const whatsappUrl = buildBatteryQuoteWhatsAppUrl({
    whatsappNumber: settings.whatsappNumber,
    batteryName: activeModel ? `${activeModel.batteryType} (${activeModel.recommendedAh}Ah)` : 'Vehicle Battery',
    vehicleInfo: `${currentBrand?.name || ''} ${activeModel?.name || ''} (${activeModel?.yearRange || ''})`
  });

  return (
    <section id="battery-finder" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="container-custom">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" className="mb-3">
            Smart Battery Matcher
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find the Exact Battery for Your Vehicle
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Select your vehicle brand and model to view recommended battery technologies, Cold Cranking Amps, and warranty-backed replacements.
          </p>
        </div>

        {/* Vehicle Selection Controls */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto mb-12 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Select Vehicle Brand
              </label>
              <select
                value={selectedBrandId}
                onChange={(e) => {
                  setSelectedBrandId(e.target.value);
                  setSelectedModelName('');
                }}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.originRegion})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                2. Select Vehicle Model
              </label>
              <select
                value={selectedModelName || activeModel?.name || ''}
                onChange={(e) => setSelectedModelName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
              >
                {models.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} ({m.yearRange})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Model Specification Card */}
          {activeModel && (
            <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5 font-medium">Recommended Technology:</span>
                <span className="font-bold text-slate-900 text-sm">{activeModel.batteryType}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5 font-medium">Target Capacity & Cranking:</span>
                <span className="font-bold text-sky-700 text-sm">~{activeModel.recommendedAh} Ah (High CCA)</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5 font-medium">Start-Stop / BMS Registration:</span>
                <span className="font-bold text-emerald-700 text-sm">
                  {activeModel.startStop ? 'Required (ECU Reset)' : 'Standard Fitment'}
                </span>
              </div>
            </div>
          )}

          {currentBrand?.notes && (
            <p className="mt-3 text-[11px] text-slate-500 italic">
              Note: {currentBrand.notes}
            </p>
          )}
        </div>

        {/* Matched Batteries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matchedBatteries.map((battery) => (
            <div
              key={battery.id}
              className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={battery.batteryType === 'AGM' ? 'accent' : 'secondary'}>
                    {battery.batteryType}
                  </Badge>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5" />
                    <span>{battery.warrantyMonths} Mo Warranty</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {battery.brandName} {battery.modelNumber}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{battery.dimensionsMm}</p>

                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block">Capacity</span>
                    <span className="font-bold text-slate-900">{battery.capacityAh} Ah</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Cold Cranking</span>
                    <span className="font-bold text-slate-900">{battery.coldCrankingAmps} CCA</span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 mb-6">
                  {battery.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block">On-Site Installed</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      {battery.showPrice ? formatAed(battery.priceAed) : 'Quote on Request'}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    Free Delivery & Test
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onRequestModalOpen}
                    className="w-full font-semibold"
                  >
                    <Wrench className="h-3.5 w-3.5 mr-1.5" />
                    <span>Book Replacement</span>
                  </Button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cannot find model fallback */}
        <div className="mt-12 text-center p-6 bg-slate-50 border border-slate-200 rounded-xl max-w-2xl mx-auto">
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Don’t see your exact vehicle or engine displacement?
          </h4>
          <p className="text-xs text-slate-600 mb-4">
            Do not worry. Send a quick photo of your car battery or vehicle registration (Mulkiya) on WhatsApp, and our technician will confirm the exact OEM battery code.
          </p>
          <a
            href={buildBatteryQuoteWhatsAppUrl({
              whatsappNumber: settings.whatsappNumber,
              batteryName: 'Custom Vehicle Battery Verification'
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Send Vehicle Photo on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
