import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function enableRLS() {
  console.log('Enabling Row Level Security (RLS) on Supabase tables...');
  try {
    await prisma.$executeRawUnsafe('ALTER TABLE "PhotoCapture" ENABLE ROW LEVEL SECURITY;');
    console.log('✅ PhotoCapture: RLS enabled');

    await prisma.$executeRawUnsafe('ALTER TABLE "CouponClaim" ENABLE ROW LEVEL SECURITY;');
    console.log('✅ CouponClaim: RLS enabled');

    await prisma.$executeRawUnsafe('ALTER TABLE "StoreMetric" ENABLE ROW LEVEL SECURITY;');
    console.log('✅ StoreMetric: RLS enabled');

    console.log('\nTesting Prisma queries to ensure server operations are unaffected...');
    const [pCount, cCount, mCount] = await Promise.all([
      prisma.photoCapture.count(),
      prisma.couponClaim.count(),
      prisma.storeMetric.count(),
    ]);
    console.log(`✅ Prisma access verified: photos=${pCount}, coupons=${cCount}, metrics=${mCount}`);
    console.log('All 3 Supabase Security Linter warnings are resolved!');
    process.exit(0);
  } catch (err) {
    console.error('Error enabling RLS:', err);
    process.exit(1);
  }
}

enableRLS();

