'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Wrench,
  BatteryCharging,
  Car,
  MapPin,
  Star,
  HelpCircle,
  Sliders,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Layers,
  Globe
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // If on login page, render without sidebar shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Service Requests', href: '/admin/requests', icon: ClipboardList, badge: 'Live' },
    { label: 'Leads & Clicks', href: '/admin/leads', icon: BarChart3 },
    { section: 'Content & Services' },
    { label: 'Automotive Services', href: '/admin/services', icon: Wrench },
    { label: 'Battery Catalog', href: '/admin/batteries', icon: BatteryCharging },
    { label: 'Battery Brands', href: '/admin/battery-brands', icon: Layers },
    { label: 'Vehicle Database', href: '/admin/vehicles', icon: Car },
    { label: 'Dubai Locations', href: '/admin/locations', icon: MapPin },
    { section: 'Social Proof & Help' },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { section: 'Website Configuration' },
    { label: 'Homepage Sections', href: '/admin/homepage', icon: Globe },
    { label: 'Global Business Settings', href: '/admin/settings', icon: Sliders }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BatteryCharging className="h-6 w-6 text-sky-400" />
          <span className="font-bold text-sm tracking-tight">Apex Admin</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop / Collapsible Sidebar */}
      <aside
        className={`${
          mobileNavOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-slate-950 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 z-30`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
              <BatteryCharging className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white block tracking-tight">
                APEX CONTROL
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                Dubai Roadside Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item, index) => {
            if (item.section) {
              return (
                <div
                  key={index}
                  className="pt-4 pb-1 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider"
                >
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold border border-slate-800 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 text-red-400 hover:bg-red-950/40 rounded-lg text-xs font-semibold transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700">
              Dubai Mobile Dispatcher Online
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500 hidden sm:inline">
              Changes reflect immediately on public website
            </span>
            <Link
              href="/"
              target="_blank"
              className="text-sky-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Live Website</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </header>

        {/* Child Pages */}
        <div className="p-6 sm:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
