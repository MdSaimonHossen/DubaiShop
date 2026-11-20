'use client';

import React, { useEffect, useState } from 'react';
import { Testimonial } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, Star, ShieldCheck } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.testimonials) setTestimonials(data.testimonials);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      customerName: '',
      district: 'Dubai Marina',
      vehicle: 'Toyota Camry',
      rating: 5,
      serviceUsed: 'Mobile Battery Replacement',
      reviewText: '',
      date: new Date().toISOString().split('T')[0],
      isVerified: true,
      isFeatured: true,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingItem({ ...t });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.customerName || !editingItem?.reviewText) return;
    setIsSaving(true);

    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });
      setIsModalOpen(false);
      loadTestimonials();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this testimonial?')) return;
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      loadTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage genuine customer reviews, ratings, vehicle tags, and verified customer badges.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Real Review</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Customer & Area</th>
                <th className="py-3.5 px-4">Vehicle & Service</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Badges</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-slate-900">{t.customerName}</strong>
                      {t.isFeatured && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-[11px]">{t.district} • {t.date}</span>
                    <p className="text-slate-600 text-xs mt-1 italic line-clamp-2 max-w-sm">"{t.reviewText}"</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">{t.vehicle}</span>
                    <span className="text-sky-700 text-[11px]">{t.serviceUsed}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-amber-400" />
                      <span className="font-bold">{t.rating}/5</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {t.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {t.isActive ? <Badge variant="success">Published</Badge> : <Badge variant="secondary">Hidden</Badge>}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(t)}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && editingItem && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title={editingItem.id ? 'Edit Review' : 'Add Customer Review'}
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq M."
                  value={editingItem.customerName || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Dubai District</label>
                <input
                  type="text"
                  placeholder="e.g. Downtown Dubai"
                  value={editingItem.district || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, district: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Vehicle Description</label>
                <input
                  type="text"
                  placeholder="e.g. BMW 530i (2021)"
                  value={editingItem.vehicle || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, vehicle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Service Performed</label>
                <input
                  type="text"
                  placeholder="e.g. Mobile AGM Battery Replacement"
                  value={editingItem.serviceUsed || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, serviceUsed: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Customer Feedback *</label>
              <textarea
                rows={4}
                required
                value={editingItem.reviewText || ''}
                onChange={(e) => setEditingItem({ ...editingItem, reviewText: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Star Rating (1–5)</label>
                <select
                  value={editingItem.rating || 5}
                  onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value={5}>5 Stars (Exceptional)</option>
                  <option value={4}>4 Stars (Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Date</label>
                <input
                  type="date"
                  value={editingItem.date || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isFeatured ?? false}
                  onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="font-semibold text-slate-900">Featured Spotlight</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isVerified ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, isVerified: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Verified Client Badge</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isActive ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, isActive: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Show on Website</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" size="sm" isLoading={isSaving}>
                Save Review
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
