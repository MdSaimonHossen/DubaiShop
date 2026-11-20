'use client';

import React, { useEffect, useState } from 'react';
import { VehicleBrand } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, Car } from 'lucide-react';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<VehicleBrand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Partial<VehicleBrand> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      if (data.vehicles) setVehicles(data.vehicles);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleOpenAdd = () => {
    setEditingVehicle({
      name: '',
      originRegion: 'Japanese',
      commonBatteryType: 'SMF or AGM',
      notes: '',
      isPopular: true,
      isActive: true,
      displayOrder: vehicles.length + 1,
      models: [
        { name: 'Model 1', yearRange: '2016–2024', batteryType: 'SMF (Sealed)', recommendedAh: 70, startStop: false }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: VehicleBrand) => {
    setEditingVehicle({ ...v });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle?.name) return;
    setIsSaving(true);

    try {
      await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVehicle)
      });
      setIsModalOpen(false);
      loadVehicles();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle brand?')) return;
    try {
      await fetch(`/api/vehicles?id=${id}`, { method: 'DELETE' });
      loadVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Vehicle Makes & Matcher Database
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage supported vehicle brands and their recommended battery technologies used by the Smart Battery Finder.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Vehicle Brand</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Origin Category</th>
                <th className="py-3.5 px-4">Common Battery Spec</th>
                <th className="py-3.5 px-4">Models Configured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {v.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="secondary">{v.originRegion}</Badge>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {v.commonBatteryType}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {v.models?.length || 0} models
                  </td>
                  <td className="py-3.5 px-4">
                    {v.isActive ? <Badge variant="success">Active</Badge> : <Badge variant="secondary">Hidden</Badge>}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(v)}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
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

      {isModalOpen && editingVehicle && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title={editingVehicle.id ? 'Edit Vehicle Brand' : 'Add Vehicle Brand'}
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Make / Brand Name *</label>
                <input
                  type="text"
                  required
                  value={editingVehicle.name || ''}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Region Category</label>
                <select
                  value={editingVehicle.originRegion || 'Japanese'}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, originRegion: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="Japanese">Japanese</option>
                  <option value="European">European</option>
                  <option value="American">American</option>
                  <option value="Korean">Korean</option>
                  <option value="Luxury/Exotic">Luxury / Exotic</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Common Battery Type / Advisory</label>
              <input
                type="text"
                value={editingVehicle.commonBatteryType || ''}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, commonBatteryType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Technician Notes (e.g. BMS registration requirements)</label>
              <textarea
                rows={2}
                value={editingVehicle.notes || ''}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, notes: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingVehicle.isActive ?? true}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, isActive: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Active in Matcher</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingVehicle.isPopular ?? true}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, isPopular: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Feature on Homepage</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" size="sm" isLoading={isSaving}>
                Save Vehicle Make
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
