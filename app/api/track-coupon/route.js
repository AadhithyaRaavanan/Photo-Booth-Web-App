import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStore, saveStore } from '@/lib/store';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const customerName = (body.customerName || '').trim() || 'Valued Guest';
    const couponCode = body.couponCode || `DIWALI-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    const discount = body.discount || 'FLAT 30% OFF';
    const platform = body.platform || 'Instagram_Story';

    let supabaseSaved = false;
    let couponCount = 0;

    // 1. Try to record into Supabase PostgreSQL via Prisma
    if (prisma) {
      try {
        const record = await prisma.couponClaim.create({
          data: {
            customerName,
            couponCode,
            discount,
            platform,
          },
        });

        await prisma.storeMetric.upsert({
          where: { key: 'coupons_issued' },
          update: { value: { increment: 1 } },
          create: { key: 'coupons_issued', value: 1 },
        });

        couponCount = await prisma.couponClaim.count();
        supabaseSaved = true;
      } catch (dbErr) {
        console.warn('Prisma/Supabase coupon claim warning (using fallback):', dbErr.message);
      }
    }

    // 2. Always maintain local store continuity as fallback
    const store = getStore();
    store.stats.couponsIssued = (store.stats.couponsIssued || 0) + 1;
    store.stats.sharesSubmitted = (store.stats.sharesSubmitted || 0) + 1;

    // Also register coupon in local submissions array if not already present
    const existing = store.submissions.find((s) => s.couponCode === couponCode);
    if (!existing) {
      store.submissions.unshift({
        id: `sub-${Date.now()}`,
        customerName,
        discount,
        couponCode,
        platform,
        status: 'APPROVED',
        createdAt: new Date().toISOString(),
        verifiedAt: new Date().toISOString(),
        isRedeemed: false,
      });
    }

    saveStore(store);

    if (!supabaseSaved) {
      couponCount = store.stats.couponsIssued;
    }

    return NextResponse.json({
      success: true,
      couponsIssued: couponCount,
      couponCode,
      supabaseSaved,
    });
  } catch (error) {
    console.error('Error tracking coupon claim:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record coupon' },
      { status: 500 }
    );
  }
}

