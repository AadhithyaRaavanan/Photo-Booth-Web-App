import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function GET() {
  const store = getStore();
  return NextResponse.json({ success: true, submissions: store.submissions });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, phone, frameId, discount, photoData, screenshotData } = body;
    const store = getStore();

    const frame = store.frames.find((f) => f.id === frameId) || store.frames[0];
    const submissionId = `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newSubmission = {
      id: submissionId,
      customerName: (customerName || '').trim() || 'Valued Guest',
      phone: phone || '',
      frameId: frame.id,
      frameName: frame.name,
      discount: discount || frame.discount || 'FLAT 30% OFF',
      photoUrl: photoData || '',
      screenshotUrl: screenshotData || '',
      status: 'PENDING',
      couponCode: null,
      createdAt: new Date().toISOString(),
      verifiedAt: null,
      isRedeemed: false,
    };

    store.submissions.unshift(newSubmission);
    store.stats.photosCaptured += 1;
    store.stats.sharesSubmitted += 1;
    saveStore(store);

    return NextResponse.json(
      {
        success: true,
        submission: newSubmission,
        message: 'Submission received and awaiting verification',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating submission', error);
    return NextResponse.json(
      { success: false, message: 'Invalid submission data' },
      { status: 400 }
    );
  }
}

