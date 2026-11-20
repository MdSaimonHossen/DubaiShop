'use client';

import React, { useEffect, useState } from 'react';
import { ServiceRequest, RequestStatus, SiteSettings } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatDateTime } from '@/lib/utils/format';
import { Phone, MessageSquare, Car, MapPin, Clock, Search, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { buildEmergencyWhatsAppUrl } from '@/lib/utils/whatsapp';

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [technicianNotes, setTechnicianNotes] = useState('');

  const loadRequests = async () => {
    try {
      const [reqRes, setRes] = await Promise.all([
        fetch('/api/requests'),
        fetch('/api/settings')
      ]);
      const reqData = await reqRes.json();
      const setData = await setRes.json();
      if (reqData.requests) setRequests(reqData.requests);
      if (setData.settings) setSettings(setData.settings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdateStatus = async (id: string, status: RequestStatus, notes?: string) => {
    setIsUpdating(true);
    try {
      await fetch(`/api/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, technicianNotes: notes })
      });
      loadRequests();
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, status, technicianNotes: notes || selectedRequest.technicianNotes });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.referenceNo.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.customerPhone.toLowerCase().includes(q) ||
        r.vehicleBrand.toLowerCase().includes(q) ||
        r.locationArea.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'NEW': return <Badge variant="danger">New Emergency</Badge>;
      case 'CONTACTED': return <Badge variant="warning">Contacted</Badge>;
      case 'CONFIRMED': return <Badge variant="accent">Confirmed</Badge>;
      case 'DISPATCHED': return <Badge variant="accent">Dispatched</Badge>;
      case 'COMPLETED': return <Badge variant="success">Completed</Badge>;
      case 'CANCELLED': return <Badge variant="secondary">Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Service Requests & Mobile Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track customer requests from dead battery report to technician dispatch and completion.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={loadRequests}>
          Refresh Queue
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by customer, phone, car, or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'NEW', 'CONTACTED', 'DISPATCHED', 'COMPLETED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === s
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ref / Time</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Vehicle</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No service requests found for this filter.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{req.referenceNo}</span>
                      <span className="text-[11px] text-slate-400">{formatDateTime(req.createdAt)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">{req.customerName}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <a href={`tel:${req.customerPhone}`} className="text-sky-600 hover:underline">
                          {req.customerPhone}
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {req.vehicleBrand} {req.vehicleModel} {req.vehicleYear && `(${req.vehicleYear})`}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {req.serviceRequired}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">{req.locationArea}</span>
                      <span className="text-[11px] text-slate-400 truncate max-w-[130px] block">
                        {req.specificLocation || 'Roadside'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedRequest(req);
                          setTechnicianNotes(req.technicianNotes || '');
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Inspect & Dispatch
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail / Dispatch Modal */}
      {selectedRequest && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRequest(null)}
          title={`Request #${selectedRequest.referenceNo}`}
          description={`Submitted at ${formatDateTime(selectedRequest.createdAt)} via ${selectedRequest.source}`}
        >
          <div className="space-y-5 text-xs text-slate-700">
            {/* Customer Details */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block font-medium">Customer:</span>
                  <strong className="text-slate-900 text-sm">{selectedRequest.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Phone:</span>
                  <a href={`tel:${selectedRequest.customerPhone}`} className="text-sky-600 font-bold text-sm hover:underline">
                    {selectedRequest.customerPhone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80">
                <div>
                  <span className="text-slate-400 block font-medium">Vehicle:</span>
                  <strong className="text-slate-900">{selectedRequest.vehicleBrand} {selectedRequest.vehicleModel} {selectedRequest.vehicleYear}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Requested Service:</span>
                  <strong className="text-sky-700">{selectedRequest.serviceRequired}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80">
                <span className="text-slate-400 block font-medium">Dubai Location:</span>
                <strong className="text-slate-900">{selectedRequest.locationArea}</strong>
                {selectedRequest.specificLocation && (
                  <span className="text-slate-600 block mt-0.5">{selectedRequest.specificLocation}</span>
                )}
              </div>

              {selectedRequest.issueDescription && (
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-slate-400 block font-medium">Customer Notes / Symptoms:</span>
                  <p className="text-slate-700 mt-0.5">{selectedRequest.issueDescription}</p>
                </div>
              )}
            </div>

            {/* Quick WhatsApp Link to Customer */}
            {settings && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4 text-emerald-700" />
                  <span>One-Click WhatsApp Dispatch Message</span>
                </h4>
                <p className="text-[11px] text-emerald-800">
                  Send pre-filled message confirming technician dispatch time to customer:
                </p>
                <a
                  href={`https://wa.me/${selectedRequest.customerWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedRequest.customerName}, this is Apex Auto Dispatch Dubai regarding your request #${selectedRequest.referenceNo} for your ${selectedRequest.vehicleBrand} in ${selectedRequest.locationArea}. Our mobile technician is preparing dispatch. Please share your live GPS location pin to ensure exact arrival.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send WhatsApp Message to Customer</span>
                </a>
              </div>
            )}

            {/* Dispatch Status Update */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Update Dispatch Status:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['NEW', 'CONTACTED', 'CONFIRMED', 'DISPATCHED', 'COMPLETED', 'CANCELLED'] as RequestStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedRequest.id, st, technicianNotes)}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedRequest.status === st
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Technician Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Technician Notes / Battery Serial / Installed Model:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Installed VARTA 80Ah AGM (Serial #98234). Alternator charging voltage verified at 14.2V. 24-month warranty card issued."
                value={technicianNotes}
                onChange={(e) => setTechnicianNotes(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                variant="accent"
                size="sm"
                isLoading={isUpdating}
                onClick={() => handleUpdateStatus(selectedRequest.id, selectedRequest.status, technicianNotes)}
              >
                Save Technician Notes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
