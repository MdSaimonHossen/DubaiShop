import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Mail, MapPin, Clock, BatteryCharging, ShieldCheck, ChevronRight } from 'lucide-react';
import { SiteSettings } from '@/types';

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800 pb-mobile-cta">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/40">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Diagnostic-First Standard</h4>
              <p className="text-xs text-slate-400">Complete electrical & alternator test before replacing any battery.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Direct On-Site Installation</h4>
              <p className="text-xs text-slate-400">Technician arrives at your home, office, or roadside with OEM batteries.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <BatteryCharging className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">12 to 24 Months Warranty</h4>
              <p className="text-xs text-slate-400">Official manufacturer warranty and compliant old battery recycling.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <BatteryCharging className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                APEX <span className="text-sky-400">AUTO</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Professional mobile automotive solutions and roadside assistance across Dubai, UAE. We specialize in on-site car battery replacement, digital charging system diagnostics, and emergency jump-starts.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{settings.addressText}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="h-4 w-4 text-sky-400 shrink-0" />
                <span>{settings.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Column: Services */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Automotive Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/car-battery-replacement" className="hover:text-white transition-colors">
                  Mobile Battery Replacement
                </Link>
              </li>
              <li>
                <Link href="/services/battery-health-testing" className="hover:text-white transition-colors">
                  Battery & Alternator Test
                </Link>
              </li>
              <li>
                <Link href="/services/jump-start-service" className="hover:text-white transition-colors">
                  Emergency Jump-Start
                </Link>
              </li>
              <li>
                <Link href="/services/roadside-assistance" className="hover:text-white transition-colors">
                  Roadside Breakdown Triage
                </Link>
              </li>
              <li>
                <Link href="/services/car-diagnostics" className="hover:text-white transition-colors">
                  OBD2 Computer Scanning
                </Link>
              </li>
              <li>
                <Link href="/services/tyre-puncture-assistance" className="hover:text-white transition-colors">
                  Mobile Tyre & Spare Wheel
                </Link>
              </li>
              <li>
                <Link href="/services/car-ac-inspection" className="hover:text-white transition-colors">
                  Car AC Cooling Check
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Batteries & Brands */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Batteries & Vehicles
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/batteries" className="hover:text-white transition-colors">
                  All Battery Products
                </Link>
              </li>
              <li>
                <Link href="/batteries/finder" className="hover:text-white transition-colors text-sky-400 font-medium">
                  Smart Battery Matcher
                </Link>
              </li>
              <li>
                <Link href="/batteries" className="hover:text-white transition-colors">
                  VARTA AGM & Start-Stop
                </Link>
              </li>
              <li>
                <Link href="/batteries" className="hover:text-white transition-colors">
                  Amaron High-Heat SMF
                </Link>
              </li>
              <li>
                <Link href="/batteries" className="hover:text-white transition-colors">
                  Bosch & ACDelco
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-white transition-colors">
                  Toyota, Nissan & Lexus
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-white transition-colors">
                  BMW & Mercedes-Benz
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Priority Locations */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Dubai Coverage Areas
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Dubai Marina & JBR
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Downtown Dubai & DIFC
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Business Bay
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Al Barsha & Tecom
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Palm Jumeirah
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Dubai Hills Estate
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-sky-400 hover:underline flex items-center gap-1 font-medium">
                  <span>View All Service Zones</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Admin Portal */}
      <div className="border-t border-slate-800 py-6 text-xs text-slate-500">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {settings.companyName}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms & Warranty
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Support
            </Link>
            <Link href="/admin/login" className="text-slate-600 hover:text-slate-300 font-medium transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
