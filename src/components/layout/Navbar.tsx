'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, BatteryCharging } from 'lucide-react';
import { SiteSettings } from '@/types';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  settings: SiteSettings;
  onRequestModalOpen?: () => void;
}

export function Navbar({ settings, onRequestModalOpen }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Batteries', href: '/batteries' },
    { label: 'Locations', href: '/locations' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Subtle Dispatch Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-medium text-slate-300 text-[11px] sm:text-xs">
              {settings.serviceStatusText}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${settings.phoneEmergency}`}
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5"
            >
              <Phone className="h-3 w-3" />
              <span>Emergency Dispatch: {settings.phoneEmergency}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Navigation */}
      <nav className="container-custom flex h-18 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-slate-800 transition-colors">
            <BatteryCharging className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
              APEX <span className="text-sky-600">AUTO</span>
            </span>
            <span className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase block">
              Mobile Battery & Roadside Dubai
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                  isActive ? 'text-slate-900 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={onRequestModalOpen}
            className="font-semibold text-xs px-4"
          >
            Book Battery Service
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-1 duration-150">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-800 hover:text-sky-600 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Button
              variant="primary"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onRequestModalOpen) onRequestModalOpen();
              }}
              className="w-full py-3"
            >
              Book Battery Service
            </Button>

            <a
              href={`tel:${settings.phoneEmergency}`}
              className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-semibold text-xs"
            >
              <Phone className="h-3.5 w-3.5 text-amber-500" />
              <span>Call Dispatch: {settings.phoneEmergency}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
