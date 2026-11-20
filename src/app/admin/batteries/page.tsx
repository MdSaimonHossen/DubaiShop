'use client';

import React, { useEffect, useState } from 'react';
import { BatteryProduct, BatteryBrand, BatteryTypeCategory } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, Shield, BatteryCharging, Check } from 'lucide-react';
import { formatAed } from '@/lib/utils/format';

export default function AdminBatteriesPage() {
  const [batteries, setBatteries] = useState<BatteryProduct[]>([]);
  const [brands, setBrands] = useState<BatteryBrand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBattery, setEditingBattery] = useState<Partial<BatteryProduct> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadData = async () => {
    try {
      const [batRes, brandRes] = await Promise.all([
        fetch('/api/batteries'),
        fetch('/api/battery-brands')
      ]);
      const batData = await batRes.json();
      const brandData = await brandRes.json();
      if (batData.batteries) setBatteries(batData.batteries);
      if (brandData.brands) setBrands(brandData.brands);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingBattery({
      brandName: brands[0]?.name || 'VARTA',
      brandId: brands[0]?.id || 'brand-varta',
      modelNumber: '',
      batteryType: 'AGM',
      capacityAh: 80,
      coldCrankingAmps: 800,
      voltage: 12,
      dimensionsMm: '315 x 175 x 190 mm',
      warrantyMonths: 18,
      priceAed: 750,
      showPrice: true,
      isInStock: true,
      recommendedFor: ['Toyota', 'BMW'],
      features: ['High heat resistance', 'Vibration proof', 'Maintenance free'],
      displayOrder: batteries.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (bat: BatteryProduct) => {
    setEditingBattery({ ...bat });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBattery?.brandName || !editingBattery?.modelNumber) return;
    setIsSaving(true);

    try {
      await fetch('/api/batteries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBattery)
      });
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this battery product?')) return;
    try {
      await fetch(`/api/batteries?id=${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Battery Products Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage models, Cold Cranking Amps (CCA), capacities (Ah), warranties, and pricing.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Battery Product</span>
        </Button>
      </div>

      {/* Batteries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Brand & Model</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Specs (Ah / CCA)</th>
                <th className="py-3.5 px-4">Warranty</th>
                <th className="py-3.5 px-4">Price (AED)</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {batteries.map((bat) => (
                <tr key={bat.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <strong className="text-sm text-slate-900 block">
                      {bat.brandName} {bat.modelNumber}
                    </strong>
                    <span className="text-[11px] text-slate-400">{bat.dimensionsMm}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={bat.batteryType === 'AGM' ? 'accent' : 'secondary'}>
                      {bat.batteryType}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-slate-900">{bat.capacityAh} Ah</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-sky-700 font-semibold">{bat.coldCrankingAmps} CCA</span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">
                    {bat.warrantyMonths} Months
                  </td>
                  <td className="py-3.5 px-4">
                    {bat.showPrice ? (
                      <span className="font-bold text-slate-900">{formatAed(bat.priceAed)}</span>
                    ) : (
                      <span className="text-slate-400 italic">Hidden (Quote on Request)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {bat.isInStock ? (
                      <Badge variant="success">In Stock</Badge>
                    ) : (
                      <Badge variant="danger">Backorder</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(bat)}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Battery"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(bat.id)}
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Battery"
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

      {/* Add / Edit Modal */}
      {isModalOpen && editingBattery && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title={editingBattery.id ? 'Edit Battery Product' : 'Add Battery to Catalog'}
          description="Manage specifications and customer-facing pricing"
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Brand Name *</label>
                <select
                  value={editingBattery.brandName || ''}
                  onChange={(e) => {
                    const sel = brands.find((b) => b.name === e.target.value);
                    setEditingBattery({
                      ...editingBattery,
                      brandName: e.target.value,
                      brandId: sel?.id || 'brand-custom'
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Model / Part Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silver Dynamic AGM 80Ah"
                  value={editingBattery.modelNumber || ''}
                  onChange={(e) => setEditingBattery({ ...editingBattery, modelNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Battery Technology</label>
                <select
                  value={editingBattery.batteryType || 'SMF (Sealed)'}
                  onChange={(e) => setEditingBattery({ ...editingBattery, batteryType: e.target.value as BatteryTypeCategory })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="AGM">AGM (Absorbent Glass Mat)</option>
                  <option value="EFB">EFB (Enhanced Flooded)</option>
                  <option value="SMF (Sealed)">SMF (Sealed Maintenance Free)</option>
                  <option value="Heavy Duty Commercial">Heavy Duty Commercial</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Capacity (Ah)</label>
                <input
                  type="number"
                  value={editingBattery.capacityAh || 70}
                  onChange={(e) => setEditingBattery({ ...editingBattery, capacityAh: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Cold Cranking Amps (CCA)</label>
                <input
                  type="number"
                  value={editingBattery.coldCrankingAmps || 600}
                  onChange={(e) => setEditingBattery({ ...editingBattery, coldCrankingAmps: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Warranty (Months)</label>
                <input
                  type="number"
                  value={editingBattery.warrantyMonths || 12}
                  onChange={(e) => setEditingBattery({ ...editingBattery, warrantyMonths: parseInt(e.target.value) || 12 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Installed Price (AED)</label>
                <input
                  type="number"
                  value={editingBattery.priceAed || 0}
                  onChange={(e) => setEditingBattery({ ...editingBattery, priceAed: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Dimensions (mm)</label>
                <input
                  type="text"
                  placeholder="e.g. 315 x 175 x 190 mm"
                  value={editingBattery.dimensionsMm || ''}
                  onChange={(e) => setEditingBattery({ ...editingBattery, dimensionsMm: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingBattery.showPrice ?? true}
                  onChange={(e) => setEditingBattery({ ...editingBattery, showPrice: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Show Price Publicly (or "Quote on Request")</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingBattery.isInStock ?? true}
                  onChange={(e) => setEditingBattery({ ...editingBattery, isInStock: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Mark as In Stock</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" size="sm" isLoading={isSaving}>
                Save Battery
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
