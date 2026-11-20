'use client';

import React, { useEffect, useState } from 'react';
import { FAQItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadFaqs = async () => {
    try {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      if (data.faqs) setFaqs(data.faqs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleOpenAdd = () => {
    setEditingFaq({
      category: 'Battery & Tech',
      question: '',
      answer: '',
      isActive: true,
      displayOrder: faqs.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: FAQItem) => {
    setEditingFaq({ ...f });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) return;
    setIsSaving(true);

    try {
      await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq)
      });
      setIsModalOpen(false);
      loadFaqs();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await fetch(`/api/faqs?id=${id}`, { method: 'DELETE' });
      loadFaqs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ) Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Questions and answers appear on the homepage and dedicated FAQ page, and feed Google FAQ Schema.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add New FAQ</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Question</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {faqs.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                    #{f.displayOrder}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {f.category}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-sm text-slate-900 block">{f.question}</strong>
                    <p className="text-slate-500 text-[11px] line-clamp-1">{f.answer}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    {f.isActive ? <Badge variant="success">Active</Badge> : <Badge variant="secondary">Hidden</Badge>}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(f)}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
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

      {isModalOpen && editingFaq && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title={editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Category</label>
                <select
                  value={editingFaq.category || 'Battery & Tech'}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="Emergency & Response">Emergency & Response</option>
                  <option value="Battery & Tech">Battery & Tech</option>
                  <option value="Pricing & Warranty">Pricing & Warranty</option>
                  <option value="Areas & Booking">Areas & Booking</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingFaq.displayOrder || 1}
                  onChange={(e) => setEditingFaq({ ...editingFaq, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Question *</label>
              <input
                type="text"
                required
                value={editingFaq.question || ''}
                onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Answer *</label>
              <textarea
                rows={4}
                required
                value={editingFaq.answer || ''}
                onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingFaq.isActive ?? true}
                  onChange={(e) => setEditingFaq({ ...editingFaq, isActive: e.target.checked })}
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
                Save FAQ
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
