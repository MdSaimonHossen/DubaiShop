'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  MessageSquare,
  Phone,
  Wrench,
  BatteryCharging,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { DashboardMetrics, ServiceRequest, RequestStatus } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDateTime } from '@/lib/utils/format';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentRequests, setRecentRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [analyticsRes, requestsRes] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/requests')
      ]);

      const analyticsData = await analyticsRes.json();
      const requestsData = await requestsRes.json();

      if (analyticsData.metrics) setMetrics(analyticsData.metrics);
      if (requestsData.requests) setRecentRequests(requestsData.requests.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (requestId: string, newStatus: RequestStatus) => {
    try {
      await fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      loadData();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'NEW': return <Badge variant="danger">New Emergency</Badge>;
      case 'CONTACTED': return <Badge variant="warning">Contacted</Badge>;
      case 'CONFIRMED': return <Badge variant="accent">Confirmed</Badge>;
      case 'DISPATCHED': return <Badge variant="accent">Van En Route</Badge>;
      case 'COMPLETED': return <Badge variant="success">Completed</Badge>;
      case 'CANCELLED': return <Badge variant="secondary">Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Business Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time Dubai roadside dispatch status, leads, and catalog controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={loadData} isLoading={isLoading}>
            Refresh Live Data
          </Button>
          <Link href="/admin/requests">
            <Button variant="accent" size="sm">
              <ClipboardList className="h-4 w-4 mr-1.5" />
              <span>Dispatch Manager</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              New Inquiries
            </span>
            <div className="h-9 w-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {metrics ? metrics.newRequests : 0}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Awaiting dispatcher response
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              WhatsApp Clicks
            </span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {metrics ? metrics.whatsappClicksCount : 0}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Direct chat conversions
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Phone Calls
            </span>
            <div className="h-9 w-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Phone className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {metrics ? metrics.phoneClicksCount : 0}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Hotline dial triggers
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Completed Jobs
            </span>
            <div className="h-9 w-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {metrics ? metrics.completedRequests : 0}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Verified completed services
          </span>
        </div>
      </div>

      {/* Quick Business Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
          Quick Management Shortcuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/settings"
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-left"
          >
            <Phone className="h-5 w-5 text-sky-600 mb-2" />
            <span className="text-xs font-bold text-slate-900 block">Change Phone / WhatsApp</span>
            <span className="text-[11px] text-slate-500">Updates across whole site</span>
          </Link>

          <Link
            href="/admin/homepage"
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-left"
          >
            <Wrench className="h-5 w-5 text-sky-600 mb-2" />
            <span className="text-xs font-bold text-slate-900 block">Edit Homepage Hero</span>
            <span className="text-[11px] text-slate-500">Headlines, badges & CTAs</span>
          </Link>

          <Link
            href="/admin/batteries"
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-left"
          >
            <BatteryCharging className="h-5 w-5 text-sky-600 mb-2" />
            <span className="text-xs font-bold text-slate-900 block">Manage Battery Prices</span>
            <span className="text-[11px] text-slate-500">Stock & AED visibility</span>
          </Link>

          <Link
            href="/admin/locations"
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-left"
          >
            <MapPin className="h-5 w-5 text-sky-600 mb-2" />
            <span className="text-xs font-bold text-slate-900 block">Active Dubai Zones</span>
            <span className="text-[11px] text-slate-500">Marina, Downtown, Hills</span>
          </Link>
        </div>
      </div>

      {/* Live Recent Inquiries Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Service Requests & Dispatches
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live customer assistance queue
            </p>
          </div>
          <Link
            href="/admin/requests"
            className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
          >
            <span>View All ({recentRequests.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ref / Time</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Vehicle</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Dubai Area</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-900 block">{req.referenceNo}</span>
                    <span className="text-[11px] text-slate-400">{formatDateTime(req.createdAt)}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{req.customerName}</span>
                    <a href={`tel:${req.customerPhone}`} className="text-sky-600 hover:underline">
                      {req.customerPhone}
                    </a>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {req.vehicleBrand} {req.vehicleModel}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {req.serviceRequired}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{req.locationArea}</span>
                    <span className="text-[11px] text-slate-400 truncate max-w-[120px] block">
                      {req.specificLocation || 'Roadside'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(req.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value as RequestStatus)}
                      className="text-xs bg-white border border-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="DISPATCHED">Dispatched</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
