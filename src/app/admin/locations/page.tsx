'use client';

import React, { useEffect, useState } from 'react';
import { ServiceLocation } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<ServiceLocation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Partial<ServiceLocation> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadLocations = async () => {
    try {
      const res = await fetch('/api/locations');
      const data = await res.json();
      if (data.locations) setLocations(data.locations);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleOpenAdd = () => {
    setEditingLocation({
      name: '',
      districtName: '',
      zoneType: 'Central',
      estimatedEta: '20–30 min',
      isActive: true,
      isPriority: true,
      dispatchNote: 'Mobile unit on active patrol.',
      displayOrder: locations.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (loc: ServiceLocation) => {
    setEditingLocation({ ...loc });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLocation?.name) return;
    setIsSaving(true);

    try {
      await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingLocation)
      });
      setIsModalOpen(false);
      loadLocations();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this service area?')) return;
    try {
      await fetch(`/api/locations?id=${id}`, { method: 'DELETE' });
      loadLocations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dubai Service Zones Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure active dispatch districts, arrival estimates, and priority response corridors.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Service District</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Area Name</th>
                <th className="py-3.5 px-4">Zone</th>
                <th className="py-3.5 px-4">Estimated ETA</th>
                <th className="py-3.5 px-4">Priority Hub</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <strong className="text-sm text-slate-900 block">{loc.name}</strong>
                    <span className="text-slate-500 text-[11px]">{loc.districtName}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {loc.zoneType}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">
                    {loc.estimatedEta}
                  </td>
                  <td className="py-3.5 px-4">
                    {loc.isPriority ? (
                      <span className="text-[11px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">
                        Priority Patrol
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Standard</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {loc.isActive ? (
                      <Badge variant="success">Active Online</Badge>
                    ) : (
                      <Badge variant="secondary">Temporarily Suspended</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(loc)}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(loc.id)}
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

      {isModalOpen && editingLocation && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title={editingLocation.id ? 'Edit Service Location' : 'Add Service Location'}
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Area Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dubai Marina & JBR"
                  value={editingLocation.name || ''}
                  onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Estimated ETA</label>
                <input
                  type="text"
                  placeholder="e.g. 20–30 min"
                  value={editingLocation.estimatedEta || ''}
                  onChange={(e) => setEditingLocation({ ...editingLocation, estimatedEta: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Sub-Districts / Communities Included</label>
              <input
                type="text"
                placeholder="e.g. Marina Gate, JBR Walk, Blue Waters"
                value={editingLocation.districtName || ''}
                onChange={(e) => setEditingLocation({ ...editingLocation, districtName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Dispatch Logistics Note</label>
              <input
                type="text"
                placeholder="e.g. Underground residential tower parking access equipped."
                value={editingLocation.dispatchNote || ''}
                onChange={(e) => setEditingLocation({ ...editingLocation, dispatchNote: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingLocation.isPriority ?? true}
                  onChange={(e) => setEditingLocation({ ...editingLocation, isPriority: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Priority Rapid Response Hub</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingLocation.isActive ?? true}
                  onChange={(e) => setEditingLocation({ ...editingLocation, isActive: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Active on Website</span>
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" size="sm" isLoading={isSaving}>
                Save Location
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
