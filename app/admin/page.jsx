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

  const conversionRate = stats.photosCaptured > 0 ? Math.round((stats.couponsIssued / stats.photosCaptured) * 100) : 0;

  return (
    <div className="min-h-screen w-full bg-[#0a0212] text-[#f6ebdd] p-4 sm:p-8 font-sans selection:bg-[#e8a33d]/30 selection:text-[#f6ebdd]">
      {/* Top Navbar */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#b5a8be] hover:text-[#f6ebdd] border border-white/10 hover:border-[#e8a33d]/40 transition mr-2"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#e8a33d]" />
              <span>Back to Booth</span>
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8a33d]/10 border border-[#e8a33d]/30 text-[11px] font-medium text-[#e8a33d] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#e8a33d]" />
              <span>Store Counting &amp; Analytics</span>
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#f6ebdd] mt-2 tracking-tight">
            Photo Booth Live Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#b5a8be] mt-0.5">
            Real-time counting of photos taken and coupons claimed across all channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-sm ${
              stats.isSupabaseConnected
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-[#e8a33d]/10 border-[#e8a33d]/40 text-[#e8a33d]'
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
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#f6ebdd] transition border border-white/10 active:scale-95 disabled:opacity-50"
            title="Refresh counters"
          >
            <RefreshCw className={`w-4 h-4 text-[#e8a33d] ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Stats Counters Grid */}
      <main className="max-w-6xl mx-auto py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* 1. Photos Captured Counter (PRIMARY LEAD STAT) */}
          <div className="p-6 rounded-3xl bg-[#1a0828] border border-[#e8a33d]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-semibold text-[#e8a33d] uppercase tracking-wider">
                Photos Captured
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#e8a33d]/15 border border-[#e8a33d]/30 flex items-center justify-center text-[#e8a33d]">
                <Camera className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-5xl sm:text-6xl font-normal font-sans tabular-nums text-[#f6ebdd] tracking-tight">
                {stats.photosCaptured}
              </span>
              <span className="text-xs text-[#b5a8be] block mt-1 font-medium">
                Total portraits snapped with festive frames
              </span>
            </div>
          </div>

          {/* 2. Coupons Issued Counter (SUPPORTING STAT WITH CONVERSION RATE) */}
          <div className="p-6 rounded-3xl bg-[#14051f] border border-white/15 shadow-md relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-semibold text-[#f6ebdd] uppercase tracking-wider">
                Coupons Claimed
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e8a33d]">
                <Gift className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-normal font-sans tabular-nums text-[#f6ebdd] tracking-tight">
                  {stats.couponsIssued}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#e8a33d]/10 border border-[#e8a33d]/30 text-[10px] font-sans font-medium text-[#e8a33d]">
                  {conversionRate}% conversion
                </span>
              </div>
              <span className="text-xs text-[#b5a8be] block mt-1 font-medium">
                30% OFF passes unlocked via social sharing
              </span>
            </div>
          </div>

          {/* 3. Total Store Visits */}
          <div className="p-6 rounded-3xl bg-[#14051f] border border-white/15 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-semibold text-[#b5a8be] uppercase tracking-wider">
                Total Visits
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b5a8be]">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-4xl sm:text-5xl font-normal font-sans tabular-nums text-[#f6ebdd] tracking-tight">
                {stats.totalVisits}
              </span>
              <span className="text-xs text-[#b5a8be] block mt-1 font-medium">
                Visitors who scanned QR or opened booth
              </span>
            </div>
          </div>
        </div>

        {/* Database Connected Status Details Card */}
        <div className="p-6 rounded-3xl bg-[#14051f] border border-[#e8a33d]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="font-serif font-semibold text-base text-[#f6ebdd]">
                {stats.isSupabaseConnected ? 'Connected to Cloud PostgreSQL' : 'Local Analytics Mode'}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                  stats.isSupabaseConnected
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-[#e8a33d]/15 text-[#e8a33d] border border-[#e8a33d]/30'
                }`}
              >
                {stats.isSupabaseConnected ? 'LIVE & IN SYNC' : 'Offline Fallback'}
              </span>
            </div>
            <p className="text-xs text-[#b5a8be] max-w-2xl leading-relaxed">
              Every photo capture and coupon claim is automatically synchronized with your Supabase database in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-[#b5a8be] bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auto-refreshing live every 15s</span>
          </div>
        </div>
      </main>
    </div>
  );
}

