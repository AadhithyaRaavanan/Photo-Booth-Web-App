import { NextResponse } from 'next/server';
import { getStore, saveStore, generateCouponCode } from '@/lib/store';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, rejectionReason } = body;
    const store = getStore();
    const subIndex = store.submissions.findIndex((s) => s.id === id);

    if (subIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }

    const sub = store.submissions[subIndex];
    sub.status = status;

    if (status === 'APPROVED') {
      if (!sub.couponCode) {
        sub.couponCode = generateCouponCode(sub.customerName);
        sub.verifiedAt = new Date().toISOString();
        store.stats.couponsIssued += 1;
      }
    } else if (status === 'REJECTED') {
      sub.rejectionReason = rejectionReason || 'Instagram story screenshot could not be verified.';
    }

    store.submissions[subIndex] = sub;
    saveStore(store);

    return NextResponse.json({
      success: true,
      submission: sub,
      message: `Submission status updated to ${status}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 400 }
    );
  }
}

