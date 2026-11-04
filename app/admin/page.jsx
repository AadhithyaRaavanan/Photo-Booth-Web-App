'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Camera,
  Gift,
  Users,
  RefreshCw,
  Database,
  ExternalLink,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  Share2,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState({
    photosCaptured: 0,
    couponsIssued: 0,
    totalVisits: 0,
    isSupabaseConnected: false,
    recentPhotos: [],
    recentCoupons: [],
  });
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error('Failed to fetch admin stats', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Poll stats every 15 seconds while dashboard is open
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#07010f] text-white p-4 sm:p-8 font-sans selection:bg-cyan-400 selection:text-black">
      {/* Top Navbar */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs text-cyan-200 border border-white/15 transition mr-2"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Booth</span>
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Store Counting &amp; Analytics</span>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-white mt-2 tracking-wide">
            Photo Booth Live Analytics
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100/70 mt-0.5">
            Real-time counting of photos taken and coupons claimed across all channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-md ${
              stats.isSupabaseConnected
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                : 'bg-amber-950/80 border-amber-400 text-amber-300'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>
              {stats.isSupabaseConnected ? 'Supabase & Prisma Live' : 'Local Store (Prisma Ready)'}
            </span>
          </div>

          <button
            onClick={fetchStats}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/15 active:scale-95 disabled:opacity-50"
            title="Refresh counters"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Stats Counters Grid */}
      <main className="max-w-6xl mx-auto py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* 1. Photos Captured Counter */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1c082e] to-[#0c0316] border-2 border-amber-400/70 shadow-[0_0_35px_rgba(255,215,0,0.2)] relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Photos Captured
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                <Camera className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {stats.photosCaptured}
              </span>
              <span className="text-xs text-amber-200/75 block mt-1 font-medium">
                Total portraits snapped with festive frames
              </span>
            </div>
          </div>

          {/* 2. Coupons Issued Counter */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#081a2e] to-[#030c17] border-2 border-cyan-400/70 shadow-[0_0_35px_rgba(6,182,212,0.2)] relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Coupons Claimed
              </span>
              <div className="w-10 h-10 rounded-2xl bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                <Gift className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {stats.couponsIssued}
              </span>
              <span className="text-xs text-cyan-200/75 block mt-1 font-medium">
                30% OFF passes unlocked via social sharing
              </span>
            </div>
          </div>

          {/* 3. Total Store Visits */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180a22] to-[#0a0210] border border-white/20 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Total Visits
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {stats.totalVisits}
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-medium">
                Visitors who scanned QR or opened booth
              </span>
            </div>
          </div>
        </div>

        {/* Database Connected Status Details Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0c0418] via-[#15072b] to-[#0c0418] border border-cyan-400/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <h3 className="font-serif font-bold text-base text-white">
                {stats.isSupabaseConnected ? 'Connected to Cloud PostgreSQL' : 'Local Analytics Mode'}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  stats.isSupabaseConnected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                }`}
              >
                {stats.isSupabaseConnected ? 'Live & In Sync' : 'Offline Fallback'}
              </span>
            </div>
            <p className="text-xs text-cyan-100/70 max-w-2xl leading-relaxed">
              Every photo capture and coupon claim is automatically synchronized with your Supabase database in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-200/80 bg-black/60 px-4 py-2 rounded-2xl border border-white/10 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auto-refreshing live every 15s</span>
          </div>
        </div>
      </main>
    </div>
  );
}

