'use client';

import React, { useEffect, useState } from 'react';
import { LeadConversionEvent, DashboardMetrics } from '@/types';
import { formatDateTime } from '@/lib/utils/format';
import { MessageSquare, Phone, CheckCircle2, TrendingUp, BarChart3, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminLeadsPage() {
  const [events, setEvents] = useState<LeadConversionEvent[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  const loadAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      if (data.events) setEvents(data.events);
      if (data.metrics) setMetrics(data.metrics);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const filteredEvents = events.filter((e) => {
    if (filterType !== 'ALL' && e.eventType !== filterType) return false;
    return true;
  });

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'WHATSAPP_CLICK':
        return <Badge variant="success">WhatsApp Click</Badge>;
      case 'PHONE_CALL':
        return <Badge variant="warning">Phone Call</Badge>;
      case 'EMERGENCY_FORM_SUBMIT':
        return <Badge variant="danger">Form Lead</Badge>;
      case 'FINDER_COMPLETED':
        return <Badge variant="accent">Battery Matcher</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Lead Conversions & Channel Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track user intent actions (WhatsApp live clicks, phone dials, and battery finder completions).
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={loadAnalytics}>
          Refresh Analytics
        </Button>
      </div>

      {/* Metrics Row */}
      {metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              WhatsApp Conversions
            </span>
            <div className="text-3xl font-extrabold text-emerald-600">
              {metrics.whatsappClicksCount}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Users sent location / inquiry</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Direct Phone Dials
            </span>
            <div className="text-3xl font-extrabold text-sky-600">
              {metrics.phoneClicksCount}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Direct emergency phone clicks</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Total Booking Leads
            </span>
            <div className="text-3xl font-extrabold text-slate-900">
              {metrics.totalRequests}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Structured website requests</p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['ALL', 'WHATSAPP_CLICK', 'PHONE_CALL', 'EMERGENCY_FORM_SUBMIT', 'FINDER_COMPLETED'].map((ft) => (
          <button
            key={ft}
            onClick={() => setFilterType(ft)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === ft
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {ft.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Event Type</th>
                <th className="py-3.5 px-4">Page / Source</th>
                <th className="py-3.5 px-4">Vehicle Mentioned</th>
                <th className="py-3.5 px-4">Location Zone</th>
                <th className="py-3.5 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No lead events logged yet.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      {getEventBadge(evt.eventType)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {evt.pageUrl}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {evt.vehicleBrand || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {evt.locationDistrict || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400">
                      {formatDateTime(evt.timestamp)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
