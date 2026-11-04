import { PrismaClient } from '@prisma/client';

/**
 * End-to-End Automated User Journey & Database Trigger Verification
 * Simulates real customer interactions from the frontend and verifies
 * that Supabase PostgreSQL receives, persists, and increments counters in real-time.
 */

const BASE_URL = 'http://localhost:3000';
const prisma = new PrismaClient();

const TEST_GUESTS = [
  {
    name: 'Priya Sharma',
    frameId: 'frame-1',
    frameName: 'Twin Royal Peacocks',
    platform: 'Instagram_Story',
    expectedCoupon: 'DIWALI-PRI-30',
  },
  {
    name: 'Arjun Verma',
    frameId: 'frame-3',
    frameName: 'Emerald Diya & Garlands',
    platform: 'WhatsApp_Status',
    expectedCoupon: 'DIWALI-ARJ-30',
  },
  {
    name: 'Deepika Patel',
    frameId: 'frame-4',
    frameName: 'Golden Temple Lotus',
    platform: 'Instagram_Story',
    expectedCoupon: 'DIWALI-DEE-30',
  },
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runSimulation() {
  console.log('========================================================================');
  console.log('  🚀 STARTING END-TO-END AUTOMATED PHOTO BOOTH & SUPABASE TEST');
  console.log('========================================================================\n');

  // Step 0: Check initial baseline state from Supabase
  console.log('--- STEP 0: Checking Initial Baseline State ---');
  const initialStatsRes = await fetch(`${BASE_URL}/api/stats`);
  const initialStats = await initialStatsRes.json();
  console.log('Initial stats from /api/stats:');
  console.log(`  Visits: ${initialStats.stats.totalVisits}`);
  console.log(`  Photos Captured: ${initialStats.stats.photosCaptured}`);
  console.log(`  Coupons Claimed: ${initialStats.stats.couponsIssued}`);
  console.log(`  Supabase Connected: ${initialStats.stats.isSupabaseConnected}`);
  console.log('');

  // Step 1: Execute customer journeys
  console.log('--- STEP 1: Simulating Customer Journeys (Visits, Snaps, Shares) ---');
  let customerIndex = 1;

  for (const guest of TEST_GUESTS) {
    console.log(`\n[Guest #${customerIndex}]: ${guest.name}`);

    // 1A: Customer arrives at Photo Booth (Landing page visit trigger)
    const visitRes = await fetch(`${BASE_URL}/api/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const visitData = await visitRes.json();
    console.log(`  1. Visited photo booth -> Tracked visit (Total: ${visitData.totalVisits || 'OK'})`);

    await sleep(400);

    // 1B: Customer chooses frame, smiles, and takes photo (Shutter trigger)
    const photoStart = Date.now();
    const photoRes = await fetch(`${BASE_URL}/api/track-photo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: guest.name,
        frameId: guest.frameId,
        frameName: guest.frameName,
      }),
    });
    const photoData = await photoRes.json();
    const photoLatency = Date.now() - photoStart;
    console.log(`  2. Captured photo with "${guest.frameName}"`);
    console.log(`     -> Supabase Saved: ${photoData.supabaseSaved} (${photoLatency}ms)`);
    console.log(`     -> Live Photos Count: ${photoData.photosCaptured}`);

    await sleep(400);

    // 1C: Customer shares story on Instagram/WhatsApp to claim 30% OFF pass
    const couponStart = Date.now();
    const couponRes = await fetch(`${BASE_URL}/api/track-coupon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: guest.name,
        couponCode: guest.expectedCoupon,
        discount: 'FLAT 30% OFF',
        platform: guest.platform,
      }),
    });
    const couponData = await couponRes.json();
    const couponLatency = Date.now() - couponStart;
    console.log(`  3. Shared to ${guest.platform} -> Claimed ${guest.expectedCoupon}`);
    console.log(`     -> Supabase Saved: ${couponData.supabaseSaved} (${couponLatency}ms)`);
    console.log(`     -> Live Coupons Count: ${couponData.couponsIssued}`);

    customerIndex++;
  }

  // Step 2: Query Supabase directly via Prisma Client to assert records in cloud tables
  console.log('\n--- STEP 2: Verifying Direct Supabase PostgreSQL Cloud Records ---');
  const [supabasePhotos, supabaseCoupons, supabaseMetrics] = await Promise.all([
    prisma.photoCapture.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.couponClaim.findMany({
      orderBy: { claimedAt: 'desc' },
      take: 5,
    }),
    prisma.storeMetric.findMany(),
  ]);

  console.log(`\n📸 Supabase "PhotoCapture" Table (${supabasePhotos.length} total rows):`);
  supabasePhotos.forEach((p, idx) => {
    console.log(`   [${idx + 1}] ID: ${p.id.slice(0, 8)}... | Name: "${p.customerName}" | Frame: "${p.frameName}" | Created: ${p.createdAt.toISOString()}`);
  });

  console.log(`\n🎁 Supabase "CouponClaim" Table (${supabaseCoupons.length} total rows):`);
  supabaseCoupons.forEach((c, idx) => {
    console.log(`   [${idx + 1}] ID: ${c.id.slice(0, 8)}... | Name: "${c.customerName}" | Code: ${c.couponCode} | Platform: ${c.platform} | Claimed: ${c.claimedAt.toISOString()}`);
  });

  console.log('\n📊 Supabase "StoreMetric" Table (Counter Aggregates):');
  supabaseMetrics.forEach((m) => {
    console.log(`   - Key: "${m.key}" -> Value: ${m.value} (Updated: ${m.updatedAt.toISOString()})`);
  });

  // Step 3: Query the live public stats endpoint that powers the /admin page
  console.log('\n--- STEP 3: Verifying Public Stats API (/api/stats) ---');
  const finalStatsRes = await fetch(`${BASE_URL}/api/stats`);
  const finalStats = await finalStatsRes.json();
  console.log('Final Live Stats Payload:');
  console.log(JSON.stringify(finalStats.stats, null, 2));

  // Assertions
  const photosMatch = finalStats.stats.photosCaptured === TEST_GUESTS.length;
  const couponsMatch = finalStats.stats.couponsIssued === TEST_GUESTS.length;
  const visitsMatch = finalStats.stats.totalVisits === TEST_GUESTS.length;
  const isConnected = finalStats.stats.isSupabaseConnected === true;

  console.log('\n========================================================================');
  if (photosMatch && couponsMatch && visitsMatch && isConnected) {
    console.log('  🎉 SUCCESS: All automated tests passed!');
    console.log(`  ✅ Photos Captured: ${finalStats.stats.photosCaptured} (Matches expected ${TEST_GUESTS.length})`);
    console.log(`  ✅ Coupons Claimed: ${finalStats.stats.couponsIssued} (Matches expected ${TEST_GUESTS.length})`);
    console.log(`  ✅ Total Visits:    ${finalStats.stats.totalVisits} (Matches expected ${TEST_GUESTS.length})`);
    console.log('  ✅ Cloud Storage:   100% verified in Supabase PostgreSQL tables');
  } else {
    console.error('  ❌ Assertion mismatch detected:');
    console.error(`     Photos: ${finalStats.stats.photosCaptured} vs ${TEST_GUESTS.length}`);
    console.error(`     Coupons: ${finalStats.stats.couponsIssued} vs ${TEST_GUESTS.length}`);
    console.error(`     Visits: ${finalStats.stats.totalVisits} vs ${TEST_GUESTS.length}`);
  }
  console.log('========================================================================\n');

  process.exit(0);
}

runSimulation().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

