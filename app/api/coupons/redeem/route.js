import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function POST(request) {
  try {
    const { code } = await request.json();
    const cleanCode = (code || '').trim().toUpperCase();
    const store = getStore();

    const subIndex = store.submissions.findIndex(
      (s) => s.couponCode && s.couponCode.toUpperCase() === cleanCode
    );

    if (subIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Coupon code not found.' },
        { status: 404 }
      );
    }

    const sub = store.submissions[subIndex];
    if (sub.isRedeemed) {
      return NextResponse.json(
        {
          success: false,
          message: `Coupon was already redeemed on ${new Date(
            sub.redeemedAt
          ).toLocaleDateString()} at ${new Date(sub.redeemedAt).toLocaleTimeString()}`,
          redeemedAt: sub.redeemedAt,
        },
        { status: 400 }
      );
    }

    sub.isRedeemed = true;
    sub.redeemedAt = new Date().toISOString();
    store.stats.couponsRedeemed += 1;
    store.submissions[subIndex] = sub;
    saveStore(store);

    return NextResponse.json({
      success: true,
      message: 'Coupon successfully verified and marked as REDEEMED!',
      coupon: sub,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid redemption request' },
      { status: 400 }
    );
  }
}

