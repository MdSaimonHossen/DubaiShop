'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SiteSettings, ServiceLocation, VehicleBrand } from '@/types';
import { CheckCircle2, MessageSquare, Phone, AlertTriangle, ArrowRight } from 'lucide-react';
import { buildEmergencyWhatsAppUrl } from '@/lib/utils/whatsapp';

interface EmergencyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  locations?: ServiceLocation[];
  vehicles?: VehicleBrand[];
  defaultService?: string;
  defaultVehicle?: string;
}

export function EmergencyRequestModal({
  isOpen,
  onClose,
  settings,
  locations = [],
  vehicles = [],
  defaultService = 'Car Battery Replacement',
  defaultVehicle = ''
}: EmergencyRequestModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    vehicleBrand: defaultVehicle || 'Toyota',
    vehicleModel: '',
    vehicleYear: '',
    serviceRequired: defaultService,
    locationArea: 'Dubai Marina',
    specificLocation: '',
    issueDescription: 'Car clicked and will not start. Battery appears dead.'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<{ referenceNo: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      setErrorMessage('Please provide your name and contact phone number.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          urgency: 'EMERGENCY_NOW',
          source: 'WEBSITE_EMERGENCY'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit request');

      setSubmittedRequest({ referenceNo: data.request.referenceNo });
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please call our emergency number directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormAndClose = () => {
    setSubmittedRequest(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetFormAndClose}
      title={submittedRequest ? 'Request Dispatched Successfully' : 'Request Mobile Automotive Assistance'}
      description={
        submittedRequest
          ? 'Our Dubai dispatcher has received your details.'
          : 'A technician will verify your vehicle specifications and prepare dispatch.'
      }
    >
      {submittedRequest ? (
        <div className="space-y-6 text-center py-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              Reference #{submittedRequest.referenceNo}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your request is prioritized. For fastest dispatch, click below to share your live WhatsApp location with our coordinator.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
            <p><span className="font-semibold text-slate-900">Vehicle:</span> {formData.vehicleBrand} {formData.vehicleModel} {formData.vehicleYear}</p>
            <p><span className="font-semibold text-slate-900">Service:</span> {formData.serviceRequired}</p>
            <p><span className="font-semibold text-slate-900">Location:</span> {formData.locationArea} {formData.specificLocation && `(${formData.specificLocation})`}</p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={buildEmergencyWhatsAppUrl({
                whatsappNumber: settings.whatsappNumber,
                vehicleBrand: formData.vehicleBrand,
                vehicleModel: formData.vehicleModel,
                year: formData.vehicleYear,
                locationArea: formData.locationArea,
                issue: `[Ref #${submittedRequest.referenceNo}] ${formData.issueDescription}`
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm shadow-md transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Share Live Location on WhatsApp</span>
            </a>

            <a
              href={`tel:${settings.phoneEmergency}`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              <span>Call Dispatcher Directly ({settings.phoneEmergency})</span>
            </a>

            <Button variant="ghost" onClick={resetFormAndClose} className="mt-2 text-xs">
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tariq Mansoor"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+971 50 123 4567"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Vehicle Make & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vehicle Make
              </label>
              <select
                value={formData.vehicleBrand}
                onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                {vehicles.length > 0 ? (
                  vehicles.map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))
                ) : (
                  <>
                    <option value="Toyota">Toyota</option>
                    <option value="Nissan">Nissan</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Lexus">Lexus</option>
                    <option value="Ford">Ford</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Audi">Audi</option>
                    <option value="Other">Other Make</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Model
              </label>
              <input
                type="text"
                placeholder="e.g. Land Cruiser / X5"
                value={formData.vehicleModel}
                onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Year
              </label>
              <input
                type="text"
                placeholder="e.g. 2021"
                value={formData.vehicleYear}
                onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Service & Location District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Service Required
              </label>
              <select
                value={formData.serviceRequired}
                onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="Car Battery Replacement">Car Battery Replacement (Mobile)</option>
                <option value="Battery Health & Alternator Test">Battery Health & Alternator Test</option>
                <option value="Emergency Safe Jump-Start">Emergency Safe Jump-Start</option>
                <option value="Roadside Breakdown Triage">Roadside Breakdown Triage</option>
                <option value="OB2 Computer Diagnostic Scan">OBD2 Diagnostic Scan</option>
                <option value="Tyre Air & Puncture Assistance">Tyre Air / Puncture Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dubai District
              </label>
              <select
                value={formData.locationArea}
                onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                {locations.length > 0 ? (
                  locations.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} ({loc.estimatedEta})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Dubai Marina">Dubai Marina (20–30 min)</option>
                    <option value="Downtown Dubai">Downtown Dubai (25–35 min)</option>
                    <option value="Business Bay">Business Bay (20–30 min)</option>
                    <option value="Al Barsha">Al Barsha (15–25 min)</option>
                    <option value="Palm Jumeirah">Palm Jumeirah (25–35 min)</option>
                    <option value="JLT">JLT Clusters (20–30 min)</option>
                    <option value="Dubai Hills">Dubai Hills Estate (20–30 min)</option>
                    <option value="Other Dubai Area">Other Dubai District</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Specific Location Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Exact Landmark / Parking Level
            </label>
            <input
              type="text"
              placeholder="e.g. Marina Gate 2, Basement Parking P2, Bay 41"
              value={formData.specificLocation}
              onChange={(e) => setFormData({ ...formData, specificLocation: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Issue notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vehicle Symptoms / Notes
            </label>
            <textarea
              rows={2}
              value={formData.issueDescription}
              onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="accent"
              isLoading={isLoading}
              className="w-full py-3.5 text-base font-semibold shadow-md"
            >
              <span>Submit & Dispatch Technician</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <p className="mt-2 text-center text-[11px] text-slate-500">
              No advance payment required. Pay on location via Card or Cash after testing & installation.
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}
