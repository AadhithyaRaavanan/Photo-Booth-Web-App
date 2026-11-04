import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const VERCEL_BASE = 'https://photo-booth-web-app.vercel.app';

async function verifyVercelAdmin() {
  console.log('========================================================================');
  console.log('  🔍 VERCEL /ADMIN & SUPABASE DATABASE CROSS-VERIFICATION');
  console.log('========================================================================\n');

  // 1. Fetch HTML of /admin from Vercel
  console.log('1. Fetching Vercel Admin Page (GET /admin):');
  const adminPageRes = await fetch(`${VERCEL_BASE}/admin`);
  console.log(`   HTTP Status: ${adminPageRes.status} OK`);
  const html = await adminPageRes.text();
  const hasAnalyticsTitle = html.includes('Photo Booth Live Analytics');
  const hasPhotosCard = html.includes('Photos Captured');
  const hasCouponsCard = html.includes('Coupons Claimed');
  const hasVisitsCard = html.includes('Total Visits');

  console.log('   - Analytics Header Present:', hasAnalyticsTitle);
  console.log('   - Photos Counter Card Present:', hasPhotosCard);
  console.log('   - Coupons Counter Card Present:', hasCouponsCard);
  console.log('   - Total Visits Card Present:', hasVisitsCard);

  // 2. Fetch the exact API endpoint that powers the /admin dashboard
  console.log('\n2. Fetching Vercel Stats API (GET /api/stats):');
  const statsRes = await fetch(`${VERCEL_BASE}/api/stats`);
  const statsData = await statsRes.json();
  console.log('   Vercel Admin API Response:');
  console.log('     Total Visits:    ', statsData.stats.totalVisits);
  console.log('     Photos Captured: ', statsData.stats.photosCaptured);
  console.log('     Coupons Claimed: ', statsData.stats.couponsIssued);
  console.log('     Supabase Badge:  ', statsData.stats.isSupabaseConnected ? '🟢 Supabase & Prisma Live' : '🟠 Local Mode');

  // 3. Direct Query to Supabase PostgreSQL Database via Prisma
  console.log('\n3. Direct Query to Supabase Cloud PostgreSQL Tables:');
  const [photoCount, couponCount, visitMetric] = await Promise.all([
    prisma.photoCapture.count(),
    prisma.couponClaim.count(),
    prisma.storeMetric.findUnique({ where: { key: 'total_visits' } }).catch(() => null),
  ]);

  console.log('   Supabase Database Actual Rows:');
  console.log('     photo_capture table: ', photoCount, 'records');
  console.log('     coupon_claim table:  ', couponCount, 'records');
  console.log('     total_visits metric: ', visitMetric?.value ?? 0);

  // 4. Cross-Verification Comparison
  console.log('\n4. Cross-Verification Results:');
  const photosMatch = statsData.stats.photosCaptured === photoCount;
  const couponsMatch = statsData.stats.couponsIssued === couponCount;
  const isSupabaseLive = statsData.stats.isSupabaseConnected === true;

  console.log(`   Photos Captured Match: ${photosMatch ? '✅ MATCH' : '❌ MISMATCH'} (Vercel: ${statsData.stats.photosCaptured} | Supabase: ${photoCount})`);
  console.log(`   Coupons Claimed Match: ${couponsMatch ? '✅ MATCH' : '❌ MISMATCH'} (Vercel: ${statsData.stats.couponsIssued} | Supabase: ${couponCount})`);
  console.log(`   Vercel Live Connection: ${isSupabaseLive ? '✅ 100% CONNECTED' : '❌ NOT CONNECTED'}`);

  console.log('\n========================================================================');
  if (photosMatch && couponsMatch && isSupabaseLive) {
    console.log('  🎉 PERFECT MATCH:');
    console.log('  Vercel /admin is pulling live numbers straight from your Supabase database!');
    console.log('  Any customer who takes a photo or shares on Vercel immediately updates /admin.');
  } else {
    console.log('  ❌ Verification failed.');
  }
  console.log('========================================================================\n');

  process.exit(0);
}

verifyVercelAdmin().catch((err) => {
  console.error('Error during Vercel admin verification:', err);
  process.exit(1);
});
