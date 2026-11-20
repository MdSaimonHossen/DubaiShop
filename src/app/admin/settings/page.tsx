'use client';

import React, { useEffect, useState } from 'react';
import { SiteSettings } from '@/types';
import { Button } from '@/components/ui/Button';
import { Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) setSettings(data.settings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) {
    return <div className="p-8 text-center text-slate-500">Loading business settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Global Business & Contact Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Updating contact numbers or hours here instantly syncs the top status bar, hero buttons, WhatsApp deep-links, and footer across all pages.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Updated Website Globally!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Contact Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Primary Dispatch Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Emergency Priority Phone (Hero & Call Buttons) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={settings.phoneEmergency}
                  onChange={(e) => setSettings({ ...settings, phoneEmergency: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono font-medium"
                />
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                WhatsApp Dispatch Number (International Format) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono font-medium"
                />
                <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Office / Landline Phone</label>
              <input
                type="text"
                value={settings.phonePrimary}
                onChange={(e) => setSettings({ ...settings, phonePrimary: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Support & Dispatch Email</label>
              <input
                type="email"
                value={settings.emailPrimary}
                onChange={(e) => setSettings({ ...settings, emailPrimary: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Brand & Location Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Company Identity & Dubai Logistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Company Trade Name *</label>
              <input
                type="text"
                required
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Top Bar Live Status Message</label>
              <input
                type="text"
                value={settings.serviceStatusText}
                onChange={(e) => setSettings({ ...settings, serviceStatusText: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-800 mb-1">
              Verified Dubai Address / Workshop Location Placeholder
            </label>
            <input
              type="text"
              value={settings.addressText}
              onChange={(e) => setSettings({ ...settings, addressText: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            />
            <p className="text-[11px] text-slate-400 mt-1 italic">
              Notice: Never invent a fake physical address. Keep accurate or configurable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Mobile Response Working Hours</label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Standard Warranty Statement</label>
              <input
                type="text"
                value={settings.warrantyStandard}
                onChange={(e) => setSettings({ ...settings, warrantyStandard: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Search Engine & Metadata Defaults
          </h3>

          <div className="text-xs space-y-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Default Meta Title</label>
              <input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Default Meta Description</label>
              <textarea
                rows={2}
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="accent" size="lg" isLoading={isSaving} className="font-bold shadow-md">
            Save Global Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
