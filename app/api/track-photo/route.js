import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStore, saveStore } from '@/lib/store';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const customerName = (body.customerName || '').trim() || 'Valued Guest';
    const frameId = body.frameId || 'frame-1';
    const frameName = body.frameName || 'Twin Royal Peacocks';

    let supabaseSaved = false;
    let photoCount = 0;

    // 1. Try to record into Supabase PostgreSQL via Prisma
    if (prisma) {
      try {
        const record = await prisma.photoCapture.create({
          data: {
            customerName,
            frameId,
            frameName,
          },
        });

        await prisma.storeMetric.upsert({
          where: { key: 'photos_captured' },
          update: { value: { increment: 1 } },
          create: { key: 'photos_captured', value: 1 },
        });

        photoCount = await prisma.photoCapture.count();
        supabaseSaved = true;
      } catch (dbErr) {
        console.warn('Prisma/Supabase photo capture warning (using fallback):', dbErr.message);
      }
    }

    // 2. Always maintain local store continuity as fallback
    const store = getStore();
    store.stats.photosCaptured = (store.stats.photosCaptured || 0) + 1;
    saveStore(store);

    if (!supabaseSaved) {
      photoCount = store.stats.photosCaptured;
    }

    return NextResponse.json({
      success: true,
      photosCaptured: photoCount,
      supabaseSaved,
    });
  } catch (error) {
    console.error('Error tracking photo capture:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record photo' },
      { status: 500 }
    );
  }
}

