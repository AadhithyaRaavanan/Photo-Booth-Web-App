import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const store = getStore();
    const index = store.frames.findIndex((f) => f.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Frame not found' },
        { status: 404 }
      );
    }

    store.frames[index] = { ...store.frames[index], ...body };
    saveStore(store);

    return NextResponse.json({
      success: true,
      frame: store.frames[index],
      message: 'Frame updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 400 }
    );
  }
}

