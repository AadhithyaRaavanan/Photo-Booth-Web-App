import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request, { params }) {
  const { id } = params;
  const store = getStore();
  const sub = store.submissions.find((s) => s.id === id);

  if (!sub) {
    return NextResponse.json(
      { success: false, message: 'Submission not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, submission: sub });
}

