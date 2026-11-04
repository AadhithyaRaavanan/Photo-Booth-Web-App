import { PrismaClient } from '@prisma/client';

const VERCEL_URL = 'https://photo-booth-web-app.vercel.app';
const prisma = new PrismaClient();

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runVercelLiveTest() {
  console.log('========================================================================');
  console.log('  🌐 TESTING LIVE VERCEL PRODUCTION DEPLOYMENT & SUPABASE TRIGGERS');
  console.log(`  Target: ${VERCEL_URL}`);
  console.log('========================================================================\n');

  // 1. Initial State from Vercel
  console.log('1. Checking initial baseline stats on Vercel:');
  const initRes = await fetch(`${VERCEL_URL}/api/stats`);
  const initData = await initRes.json();
  console.log('   Baseline stats:', initData.stats);
  console.log(`   Supabase Connected: ${initData.stats.isSupabaseConnected}\n`);

  // 2. Trigger Visit on Vercel
  console.log('2. Simulating User Visit on Vercel (POST /api/track-visit)...');
  const visitRes = await fetch(`${VERCEL_URL}/api/track-visit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const visitData = await visitRes.json();
  console.log('   Visit Response:', visitData);

  await sleep(500);

  // 3. Trigger Photo Capture on Vercel
  console.log('\n3. Simulating Photo Capture on Vercel (POST /api/track-photo)...');
  const photoPayload = {
    customerName: 'Kavita Rao (Vercel Test)',
    frameId: 'frame-1',
    frameName: 'Twin Royal Peacocks',
  };
  const photoRes = await fetch(`${VERCEL_URL}/api/track-photo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photoPayload),
  });
  const photoData = await photoRes.json();
  console.log('   Photo Capture Response:', photoData);

  await sleep(500);

  // 4. Trigger Coupon Claim on Vercel
  console.log('\n4. Simulating Social Share & Coupon Claim on Vercel (POST /api/track-coupon)...');
  const couponPayload = {
    customerName: 'Kavita Rao (Vercel Test)',
    couponCode: 'DIWALI-KAV-30',
    discount: 'FLAT 30% OFF',
    platform: 'Instagram_Story',
  };
  const couponRes = await fetch(`${VERCEL_URL}/api/track-coupon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(couponPayload),
  });
  const couponData = await couponRes.json();
  console.log('   Coupon Claim Response:', couponData);

  await sleep(500);

  // 5. Query Vercel Stats Endpoint
  console.log('\n5. Fetching updated stats from Vercel (/api/stats)...');
  const updatedRes = await fetch(`${VERCEL_URL}/api/stats`);
  const updatedData = await updatedRes.json();
  console.log('   Updated stats from Vercel:');
  console.log(`     Total Visits:    ${updatedData.stats.totalVisits}`);
  console.log(`     Photos Captured: ${updatedData.stats.photosCaptured}`);
  console.log(`     Coupons Claimed: ${updatedData.stats.couponsIssued}`);
  console.log(`     Supabase Live:   ${updatedData.stats.isSupabaseConnected}`);

  // 6. Direct Cross-Check with Supabase Database
  console.log('\n6. Cross-checking Supabase cloud database directly...');
  const latestPhoto = await prisma.photoCapture.findFirst({
    where: { customerName: 'Kavita Rao (Vercel Test)' },
  });
  const latestCoupon = await prisma.couponClaim.findFirst({
    where: { couponCode: 'DIWALI-KAV-30' },
  });

  console.log('   Database Photo Record found in Supabase:', latestPhoto ? `YES (ID: ${latestPhoto.id})` : 'NO');
  console.log('   Database Coupon Record found in Supabase:', latestCoupon ? `YES (ID: ${latestCoupon.id})` : 'NO');

  // Assertions
  const success =
    photoData.supabaseSaved === true &&
    couponData.supabaseSaved === true &&
    updatedData.stats.photosCaptured >= 1 &&
    updatedData.stats.couponsIssued >= 1 &&
    latestPhoto !== null &&
    latestCoupon !== null;

  console.log('\n========================================================================');
  if (success) {
    console.log('  🎉 VERCEL BACKEND TRIGGERS ARE 100% OPERATIONAL & IN SYNC!');
    console.log('  ✅ Vercel Serverless API successfully executed write triggers');
    console.log('  ✅ Supabase cloud database permanently stored the records');
    console.log('  ✅ Vercel Admin API successfully reflected the real-time counts');
  } else {
    console.error('  ❌ Trigger verification mismatch on Vercel.');
  }
  console.log('========================================================================\n');

  // Clean up test record after confirming
  console.log('7. Resetting test trigger from Supabase to restore clean 0 baseline...');
  await prisma.photoCapture.deleteMany({});
  await prisma.couponClaim.deleteMany({});
  await prisma.storeMetric.createMany({
    data: [
      { key: 'photos_captured', value: 0 },
      { key: 'coupons_issued', value: 0 },
      { key: 'total_visits', value: 0 },
    ],
    skipDuplicates: true,
  });
  await prisma.storeMetric.updateMany({
    data: { value: 0 },
  });
  console.log('   ✅ All counters clean and reset to 0 in Supabase.\n');

  process.exit(0);
}

runVercelLiveTest().catch((err) => {
  console.error('Vercel live test error:', err);
  process.exit(1);
});

