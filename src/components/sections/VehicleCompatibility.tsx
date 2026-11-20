import React from 'react';
import Link from 'next/link';
import { VehicleBrand } from '@/types';
import { Car, ChevronRight, CheckCircle2 } from 'lucide-react';

interface VehicleCompatibilityProps {
  vehicles: VehicleBrand[];
}

export function VehicleCompatibility({ vehicles }: VehicleCompatibilityProps) {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            Broad Vehicle Support
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Vehicle Makes We Service Daily
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From Japanese everyday commuters to European luxury sports cars and GCC V8 off-roaders, our mobile vans carry exact OEM-fitment batteries and diagnostic scanners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 hover:border-sky-300 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                      <Car className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{vehicle.name}</h3>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {vehicle.originRegion}
                  </span>
                </div>

                <div className="text-xs text-slate-600 mb-3 space-y-1">
                  <p><span className="font-semibold text-slate-800">Battery Spec:</span> {vehicle.commonBatteryType}</p>
                </div>

                {vehicle.models && vehicle.models.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Popular Models Covered:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {vehicle.models.slice(0, 3).map((m) => (
                        <span key={m.name} className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
                          {m.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href="/batteries/finder"
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center justify-between"
                >
                  <span>Find {vehicle.name} Battery</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
