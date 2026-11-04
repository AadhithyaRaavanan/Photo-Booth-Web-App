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

        {/* Database Connection Instructions Banner */}
        {!stats.isSupabaseConnected && (
          <div className="p-5 rounded-2xl bg-[#140624] border border-cyan-400/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base">🐘</span>
                <h4 className="font-bold text-sm text-cyan-200">
                  Connect Your Supabase Database in 1 Step
                </h4>
              </div>
              <p className="text-xs text-cyan-100/75 max-w-2xl leading-relaxed">
                Add your Supabase PostgreSQL connection string to <code className="px-1.5 py-0.5 rounded bg-black/60 text-amber-300 font-mono">DATABASE_URL</code> in <code className="px-1.5 py-0.5 rounded bg-black/60 text-cyan-300 font-mono">.env</code> to store all photo captures and coupon claims permanently in cloud database tables.
              </p>
            </div>
            <div className="shrink-0">
              <code className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-black/80 border border-cyan-400/40 text-cyan-300 block">
                npm run db:push
              </code>
            </div>
          </div>
        )}

        {/* Two Activity Feeds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feed 1: Recent Photo Captures */}
          <div className="p-6 rounded-3xl bg-[#0e041d]/90 border border-amber-400/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif font-bold text-base text-white">
                  Recent Photo Captures
                </h3>
              </div>
              <span className="text-xs text-amber-300 font-mono font-bold">
                Live Feed
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {stats.recentPhotos && stats.recentPhotos.length > 0 ? (
                stats.recentPhotos.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-bold text-white block truncate">
                        {item.customerName || 'Valued Guest'}
                      </span>
                      <span className="text-[10px] text-amber-300/80 block mt-0.5">
                        Frame: {item.frameName || item.frameId || 'Royal Frame'}
                      </span>
                    </div>
                    <div className="text-right text-[10px] text-slate-400 font-mono shrink-0 ml-3">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No photos captured yet today. Tap Take Photo in the booth!
                </div>
              )}
            </div>
          </div>

          {/* Feed 2: Recent Coupon Claims */}
          <div className="p-6 rounded-3xl bg-[#070b1a]/90 border border-cyan-400/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-cyan-400" />
                <h3 className="font-serif font-bold text-base text-white">
                  Recent Coupon Passes Issued
                </h3>
              </div>
              <span className="text-xs text-cyan-300 font-mono font-bold">
                Live Feed
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {stats.recentCoupons && stats.recentCoupons.length > 0 ? (
                stats.recentCoupons.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white truncate">
                          {item.customerName || 'Valued Guest'}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-[9px] font-bold">
                          {item.discount || '30% OFF'}
                        </span>
                      </div>
                      <span className="text-[10px] text-cyan-300 font-mono block mt-0.5">
                        Code: {item.couponCode} · {item.platform || 'Social Share'}
                      </span>
                    </div>
                    <div className="text-right text-[10px] text-slate-400 font-mono shrink-0 ml-3">
                      {new Date(item.claimedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No coupons claimed yet. Share photo to unlock first coupon!
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

