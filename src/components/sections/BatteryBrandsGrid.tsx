import React from 'react';
import Link from 'next/link';
import { BatteryBrand } from '@/types';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface BatteryBrandsGridProps {
  brands: BatteryBrand[];
}

export function BatteryBrandsGrid({ brands }: BatteryBrandsGridProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
              Curated Quality Lineup
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Premium Battery Brands We Stock
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              All supplied batteries are factory-fresh stock backed by genuine official manufacturer warranty cards and digital records.
            </p>
          </div>

          <Link
            href="/batteries"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors"
          >
            <span>Explore Battery Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900">{brand.name}</h3>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {brand.countryOfOrigin}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {brand.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{brand.warrantyStandard}</span>
                </div>
                <span className="text-slate-400 text-[11px]">Factory Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
