'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BatteryCharging, Lock, User, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Incorrect password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="h-14 w-14 rounded-2xl bg-sky-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-600/30 mb-4">
          <BatteryCharging className="h-8 w-8 text-sky-200" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Apex Auto Admin Portal
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Dubai Business Management & Roadside Dispatch Center
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-md">
          <form onSubmit={handleLogin} className="space-y-5">
            {errorMessage && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter admin username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter business password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              </div>
              <p className="mt-2 text-[11px] text-slate-400">
                Default: User <code className="text-sky-400 font-mono">admin</code> / Pass <code className="text-sky-400 font-mono">dubai2026</code>
              </p>
            </div>

            <Button
              type="submit"
              variant="accent"
              isLoading={isLoading}
              className="w-full py-3.5 text-sm font-bold shadow-md"
            >
              <span>Unlock Admin Center</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Restricted to Authorized Apex Automotive Staff</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
