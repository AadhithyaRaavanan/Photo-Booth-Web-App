import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET() {
  const store = getStore();
  const totalSubmissions = store.submissions.length;
  const pendingCount = store.submissions.filter((s) => s.status === 'PENDING').length;
  const approvedCount = store.submissions.filter((s) => s.status === 'APPROVED').length;
  const redeemedCount = store.submissions.filter((s) => s.isRedeemed).length;

  return NextResponse.json({
    success: true,
    stats: {
      totalVisits: store.stats.totalVisits,
      photosCaptured: store.stats.photosCaptured,
      sharesSubmitted: store.stats.sharesSubmitted,
      pendingVerifications: pendingCount,
      couponsIssued: approvedCount,
      couponsRedeemed: redeemedCount,
    },
  });
}

