import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStore } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const store = getStore();

  let photosCaptured = store.stats.photosCaptured || 0;
  let couponsIssued = store.stats.couponsIssued || 0;
  let recentPhotos = [];
  let recentCoupons = [];
  let isSupabaseConnected = false;

  if (prisma) {
    try {
      const [pCount, cCount, pList, cList] = await Promise.all([
        prisma.photoCapture.count(),
        prisma.couponClaim.count(),
        prisma.photoCapture.findMany({
          take: 10,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.couponClaim.findMany({
          take: 10,
          orderBy: { claimedAt: 'desc' },
        }),
      ]);

      photosCaptured = pCount;
      couponsIssued = cCount;
      recentPhotos = pList;
      recentCoupons = cList;
      isSupabaseConnected = true;
    } catch (err) {
      console.warn('Prisma/Supabase stats query warning (falling back to local):', err.message);
    }
  }

  // Fallback lists if not connected to Supabase
  if (!isSupabaseConnected) {
    recentCoupons = store.submissions.slice(0, 10).map((s) => ({
      id: s.id,
      customerName: s.customerName,
      couponCode: s.couponCode,
      discount: s.discount,
      platform: s.platform || 'Instagram_Story',
      claimedAt: s.verifiedAt || s.createdAt,
      isRedeemed: s.isRedeemed,
    }));
  }

  return NextResponse.json({
    success: true,
    stats: {
      totalVisits: store.stats.totalVisits || 0,
      photosCaptured,
      couponsIssued,
      couponsRedeemed: store.stats.couponsRedeemed || 0,
      isSupabaseConnected,
      recentPhotos,
      recentCoupons,
    },
  });
}
