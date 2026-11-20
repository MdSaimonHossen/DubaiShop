'use client';

import React, { useEffect, useState } from 'react';
import { PageSectionConfig } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Edit2, Eye, EyeOff, Check, ArrowRight } from 'lucide-react';

export default function AdminHomepageSectionsPage() {
  const [sections, setSections] = useState<PageSectionConfig[]>([]);
  const [editingSection, setEditingSection] = useState<PageSectionConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadSections = async () => {
    try {
      const res = await fetch('/api/homepage');
      const data = await res.json();
      if (data.sections) setSections(data.sections);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleToggleActive = async (sec: PageSectionConfig) => {
    try {
      await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sec.id, isActive: !sec.isActive })
      });
      loadSections();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    setIsSaving(true);

    try {
      await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSection)
      });
      setEditingSection(null);
      loadSections();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const getFriendlySectionName = (key: string) => {
    switch (key) {
      case 'hero': return '01. Hero Section (Headline, Subhead & CTAs)';
      case 'trust_strip': return '02. Trust & Standards (4 Core Proofs)';
      case 'primary_service': return '03. Flagship Battery Service (Diagnostic-First)';
      case 'how_it_works': return '04. The 3-Step Process (Diagnose, Confirm, Install)';
      case 'battery_types': return '05. Battery Types & Genuine Brands';
      case 'secondary_services': return '06. Secondary Roadside & Diagnostic Services';
      case 'coverage_areas': return '07. Dubai Coverage & Priority Response Hubs';
      case 'testimonials': return '08. Verified Experiences & Client Feedback';
      case 'faqs': return '09. Frequently Asked Questions';
      case 'final_cta': return '10. Final Conversion CTA';
      default: return key;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Homepage Section Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mirroring the refined 8-section homepage. Edit headlines, copy, and visibility without code.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={loadSections}>
          Refresh Sections
        </Button>
      </div>

      <div className="space-y-3">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">
                  {getFriendlySectionName(sec.sectionKey)}
                </span>
                {sec.isActive ? (
                  <Badge variant="success">Visible</Badge>
                ) : (
                  <Badge variant="secondary">Hidden</Badge>
                )}
              </div>
              <h3 className="text-xs font-semibold text-sky-800">
                Title: "{sec.title}"
              </h3>
              <p className="text-[11px] text-slate-500 max-w-2xl line-clamp-1">
                {sec.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleActive(sec)}
                className={`p-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  sec.isActive
                    ? 'text-slate-500 hover:bg-slate-100'
                    : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                }`}
                title={sec.isActive ? 'Hide Section' : 'Show Section'}
              >
                {sec.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="hidden sm:inline">{sec.isActive ? 'Hide' : 'Activate'}</span>
              </button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingSection(sec)}
              >
                <Edit2 className="h-3.5 w-3.5 mr-1" />
                <span>Edit Content</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {editingSection && (
        <Modal
          isOpen={true}
          onClose={() => setEditingSection(null)}
          title={`Edit: ${getFriendlySectionName(editingSection.sectionKey)}`}
          description="Where does this appear? Directly on the public homepage."
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Section Headline (H2) *
              </label>
              <input
                type="text"
                required
                value={editingSection.title || ''}
                onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Supporting Subtitle / Paragraph
              </label>
              <textarea
                rows={3}
                value={editingSection.subtitle || ''}
                onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {editingSection.primaryButtonText !== undefined && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={editingSection.primaryButtonText || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, primaryButtonText: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Secondary Button Text</label>
                  <input
                    type="text"
                    value={editingSection.secondaryButtonText || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, secondaryButtonText: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingSection.isActive ?? true}
                  onChange={(e) => setEditingSection({ ...editingSection, isActive: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Section Active on Public Homepage</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" size="sm" isLoading={isSaving}>
                Save Section Content
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
