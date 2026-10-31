import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function POST() {
  const store = getStore();
  store.stats.totalVisits += 1;
  saveStore(store);
  return NextResponse.json({ success: true });
}

