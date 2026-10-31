import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function GET() {
  const store = getStore();
  return NextResponse.json({ success: true, config: store.config });
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const store = getStore();
    store.config = { ...store.config, ...body };
    saveStore(store);
    return NextResponse.json({
      success: true,
      config: store.config,
      message: 'Store settings updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 400 }
    );
  }
}

