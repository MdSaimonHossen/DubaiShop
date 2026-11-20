'use client';

import React, { useEffect, useState } from 'react';
import { ServiceItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, Check, X, Wrench, ShieldAlert } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService({
      name: '',
      tagline: '',
      shortDescription: '',
      fullDescription: '',
      iconName: 'Wrench',
      features: ['On-site mobile dispatch', 'Professional certified technician'],
      isEmergency: false,
      isFeatured: true,
      isActive: true,
      displayOrder: services.length + 1,
      estimatedTime: '25–40 min',
      warrantyInfo: 'Official Warranty Included'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService({ ...srv });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.name) return;
    setIsSaving(true);

    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService)
      });
      setIsModalOpen(false);
      loadServices();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this service?')) return;
    try {
      await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      loadServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Automotive Services Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add or modify services displayed on the public website. Keep battery replacement as the flagship service.
          </p>
        </div>

        <Button variant="accent" size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add New Service</span>
        </Button>
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Service Name</th>
                <th className="py-3.5 px-4">Response Time</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-500">
                    #{srv.displayOrder}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-sm text-slate-900 block">{srv.name}</strong>
                    <span className="text-slate-500 text-[11px] line-clamp-1">{srv.shortDescription}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {srv.estimatedTime}
                  </td>
                  <td className="py-3.5 px-4">
                    {srv.isEmergency ? (
                      <Badge variant="warning">Emergency Ready</Badge>
                    ) : (
                      <Badge variant="secondary">Scheduled / On-Site</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {srv.isActive ? (
                      <Badge variant="success">Active Online</Badge>
                    ) : (
                      <Badge variant="secondary">Disabled</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id)}
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Service"
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
      {isModalOpen && editingService && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title={editingService.id ? 'Edit Service' : 'Add New Automotive Service'}
          description="Content changes will appear immediately on the public website and service detail page."
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Car Battery Replacement"
                  value={editingService.name || ''}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Tagline / Sub-Heading</label>
                <input
                  type="text"
                  placeholder="e.g. Hero On-Site Service with Full Electrical Testing"
                  value={editingService.tagline || ''}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Short Description (Cards & Previews)</label>
              <textarea
                rows={2}
                required
                value={editingService.shortDescription || ''}
                onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Full Detailed Description (Service Page)</label>
              <textarea
                rows={4}
                required
                value={editingService.fullDescription || ''}
                onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Estimated Arrival Time</label>
                <input
                  type="text"
                  placeholder="e.g. 20–35 min arrival"
                  value={editingService.estimatedTime || ''}
                  onChange={(e) => setEditingService({ ...editingService, estimatedTime: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Warranty Info</label>
                <input
                  type="text"
                  placeholder="e.g. 12–24 Months Warranty"
                  value={editingService.warrantyInfo || ''}
                  onChange={(e) => setEditingService({ ...editingService, warrantyInfo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingService.displayOrder || 1}
                  onChange={(e) => setEditingService({ ...editingService, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingService.isEmergency ?? false}
                  onChange={(e) => setEditingService({ ...editingService, isEmergency: e.target.checked })}
                  className="h-4 w-4 text-sky-600 rounded"
                />
                <span className="font-semibold text-slate-900">Roadside Priority / Emergency</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingService.isActive ?? true}
                  onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
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
                Save Service
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
