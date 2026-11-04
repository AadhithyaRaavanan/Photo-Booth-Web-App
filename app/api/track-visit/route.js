import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStore, saveStore } from '@/lib/store';

export async function POST() {
  const store = getStore();
  store.stats.totalVisits = (store.stats.totalVisits || 0) + 1;
  saveStore(store);

  if (prisma) {
    try {
      await prisma.storeMetric.upsert({
        where: { key: 'total_visits' },
        update: { value: { increment: 1 } },
        create: { key: 'total_visits', value: 1 },
      });
    } catch (e) {
      // ignore
    }
  }

  return NextResponse.json({ success: true, totalVisits: store.stats.totalVisits });
}

