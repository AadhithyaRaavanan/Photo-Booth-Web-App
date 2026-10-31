import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request, { params }) {
  const code = (params.code || '').trim().toUpperCase();
  const store = getStore();
  const sub = store.submissions.find(
    (s) => s.couponCode && s.couponCode.toUpperCase() === code
  );

  if (!sub) {
    return NextResponse.json(
      { success: false, message: 'Invalid coupon code. Not found in records.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    coupon: {
      code: sub.couponCode,
      customerName: sub.customerName,
      phone: sub.phone,
      discount: sub.discount,
      status: sub.status,
      isRedeemed: sub.isRedeemed,
      redeemedAt: sub.redeemedAt || null,
      validUntil: store.config.validityDate,
      shopName: store.config.shopName,
    },
  });
}

