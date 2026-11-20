'use client';

import React, { useEffect, useState } from 'react';
import { BatteryBrand } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminBatteryBrandsPage() {
  const [brands, setBrands] = useState<BatteryBrand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Partial<BatteryBrand> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadBrands = async () => {
    try {
      const res = await fetch('/api/battery-brands');
      const data = await res.json();
      if (data.brands) setBrands(data.brands);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleOpenAdd = () => {
    setEditingBrand({
      name: '',
      countryOfOrigin: 'Germany',
      warrantyStandard: 'Up to 18 Months Warranty',
      description: '',
      isFeatured: true,
      isActive: true,
      displayOrder: brands.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brand: BatteryBrand) => {
    setEditingBrand({ ...brand });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand?.name) return;
    setIsSaving(true);

    try {
      await fetch('/api/battery-brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBrand)
      });
      setIsModalOpen(false);
      loadBrands();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    try {
      await fetch(`/api/battery-brands?id=${id}`, { method: 'DELETE' });
      loadBrands();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Battery Brands
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage approved manufacturer brands (VARTA, Amaron, Bosch, ACDelco, Solite) displayed on public brand grids.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Battery Brand</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Origin</th>
                <th className="py-3.5 px-4">Warranty Standard</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {brands.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <strong className="text-sm text-slate-900 block">{b.name}</strong>
                    <span className="text-slate-500 text-[11px] line-clamp-1">{b.description}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {b.countryOfOrigin}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">
                    {b.warrantyStandard}
                  </td>
                  <td className="py-3.5 px-4">
                    {b.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Hidden</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
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

      {isModalOpen && editingBrand && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title={editingBrand.id ? 'Edit Brand' : 'Add Battery Brand'}
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Brand Name *</label>
              <input
                type="text"
                required
                value={editingBrand.name || ''}
                onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Country of Origin</label>
                <input
                  type="text"
                  placeholder="e.g. Germany"
                  value={editingBrand.countryOfOrigin || ''}
                  onChange={(e) => setEditingBrand({ ...editingBrand, countryOfOrigin: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Warranty Standard</label>
                <input
                  type="text"
                  placeholder="e.g. 18 Months Official"
                  value={editingBrand.warrantyStandard || ''}
                  onChange={(e) => setEditingBrand({ ...editingBrand, warrantyStandard: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Brand Description</label>
              <textarea
                rows={3}
                value={editingBrand.description || ''}
                onChange={(e) => setEditingBrand({ ...editingBrand, description: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingBrand.isActive ?? true}
                  onChange={(e) => setEditingBrand({ ...editingBrand, isActive: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Active Online</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingBrand.isFeatured ?? true}
                  onChange={(e) => setEditingBrand({ ...editingBrand, isFeatured: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Show on Homepage</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" size="sm" isLoading={isSaving}>
                Save Brand
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
