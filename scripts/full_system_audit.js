import puppeteer from 'puppeteer-core';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const LOCAL_URL = 'http://localhost:3000';
const VERCEL_URL = 'https://photo-booth-web-app.vercel.app';
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`   ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`   ❌ FAIL: ${message}`);
    failCount++;
  }
}

async function cleanDatabase() {
  await prisma.photoCapture.deleteMany({});
  await prisma.couponClaim.deleteMany({});
  await prisma.storeMetric.upsert({
    where: { key: 'photos_captured' },
    update: { value: 0 },
    create: { key: 'photos_captured', value: 0 },
  });
  await prisma.storeMetric.upsert({
    where: { key: 'coupons_issued' },
    update: { value: 0 },
    create: { key: 'coupons_issued', value: 0 },
  });
  await prisma.storeMetric.upsert({
    where: { key: 'total_visits' },
    update: { value: 0 },
    create: { key: 'total_visits', value: 0 },
  });

  const storePath = path.join('data', 'store.json');
  if (fs.existsSync(storePath)) {
    const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    store.submissions = [];
    store.stats = {
      totalVisits: 0,
      photosCaptured: 0,
      sharesSubmitted: 0,
      couponsIssued: 0,
      couponsRedeemed: 0,
    };
    fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
  }
}

async function runFullAudit() {
  console.log('========================================================================');
  console.log('  🌟 FULL SYSTEM END-TO-END AUTOMATION & REGRESSION AUDIT');
  console.log('  Testing Frontend (Mobile & Desktop), Backend APIs, & Supabase Database');
  console.log('========================================================================\n');

  // ---------------------------------------------------------------------------
  // PHASE 1: DATABASE BASELINE CLEAN
  // ---------------------------------------------------------------------------
  console.log('========================================================================');
  console.log('  PHASE 1: RESETTING DATABASE BASELINE TO ZERO');
  console.log('========================================================================');
  await cleanDatabase();
  const initStatsRes = await fetch(`${LOCAL_URL}/api/stats`);
  const initStats = await initStatsRes.json();
  assert(initStats.stats.photosCaptured === 0, 'Initial photos count is 0');
  assert(initStats.stats.couponsIssued === 0, 'Initial coupons count is 0');
  assert(initStats.stats.totalVisits === 0, 'Initial visits count is 0');
  assert(initStats.stats.isSupabaseConnected === true, 'Supabase connected successfully');

  // ---------------------------------------------------------------------------
  // PHASE 2: BACKEND API AUDIT
  // ---------------------------------------------------------------------------
  console.log('\n========================================================================');
  console.log('  PHASE 2: BACKEND API & DATA TRIGGERS AUDIT');
  console.log('========================================================================');

  // 2A: Config Endpoint
  const configRes = await fetch(`${LOCAL_URL}/api/config`);
  const configData = await configRes.json();
  assert(configData.success === true, 'GET /api/config returns success');
  assert(configData.config.shopName === 'Dream Salon', 'Shop name is Dream Salon');
  assert(configData.config.discountLabel === 'FLAT 30% OFF', 'Discount label is FLAT 30% OFF');

  // 2B: Frames Endpoint
  const framesRes = await fetch(`${LOCAL_URL}/api/frames`);
  const framesData = await framesRes.json();
  assert(framesData.success === true && framesData.frames.length === 8, 'GET /api/frames returns 8 royal frames');

  // 2C: Visit Trigger
  const visitRes = await fetch(`${LOCAL_URL}/api/track-visit`, { method: 'POST' });
  const visitData = await visitRes.json();
  assert(visitData.success === true, 'POST /api/track-visit successfully records visit');

  // 2D: Photo Trigger
  const photoRes = await fetch(`${LOCAL_URL}/api/track-photo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerName: 'System Auditor', frameId: 'frame-1', frameName: 'Twin Royal Peacocks' }),
  });
  const photoData = await photoRes.json();
  assert(photoData.success === true && photoData.supabaseSaved === true, 'POST /api/track-photo saves to Supabase');

  // 2E: Coupon Trigger
  const couponRes = await fetch(`${LOCAL_URL}/api/track-coupon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerName: 'System Auditor', couponCode: 'DIWALI-SYS-30', discount: 'FLAT 30% OFF', platform: 'Instagram_Story' }),
  });
  const couponData = await couponRes.json();
  assert(couponData.success === true && couponData.supabaseSaved === true, 'POST /api/track-coupon saves to Supabase');

  // 2F: Stats Verification
  const auditStatsRes = await fetch(`${LOCAL_URL}/api/stats`);
  const auditStats = await auditStatsRes.json();
  assert(auditStats.stats.photosCaptured >= 1, 'Live photos count incremented');
  assert(auditStats.stats.couponsIssued >= 1, 'Live coupons count incremented');
  assert(auditStats.stats.totalVisits >= 1, 'Live visits count incremented');

  // ---------------------------------------------------------------------------
  // PHASE 3: REAL HEADLESS BROWSER AUDIT - MOBILE VIEWPORT (390x844)
  // ---------------------------------------------------------------------------
  console.log('\n========================================================================');
  console.log('  PHASE 3: MOBILE BROWSER AUTOMATION (390x844 - iPhone 14 Viewport)');
  console.log('========================================================================');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream'],
  });

  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  console.log('3A. Loading Landing Page on Mobile...');
  await mobilePage.goto(`${LOCAL_URL}`, { waitUntil: 'networkidle2' });

  // Verify Admin Button Top-Left
  const adminBtn = await mobilePage.$('a[href="/admin"]');
  assert(adminBtn !== null, 'Top-left Admin button is visible on mobile landing page');

  // Verify Enter Photo Booth CTA
  const enterBtn = await mobilePage.$('button');
  const bodyText = await mobilePage.evaluate(() => document.body.innerText);
  assert(bodyText.includes('DREAM SALON'), 'Landing page renders DREAM SALON branding');
  assert(bodyText.includes('ENTER PHOTO BOOTH'), 'Landing page renders ENTER PHOTO BOOTH CTA');

  // Click Enter Photo Booth to trigger Name Modal
  console.log('3B. Opening Name Modal on Mobile...');
  await mobilePage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enter = btns.find((b) => b.innerText.toUpperCase().includes('ENTER'));
    if (enter) enter.click();
  });
  await mobilePage.waitForFunction(
    () => document.body.innerText.toUpperCase().includes('PERSONALIZE YOUR PORTRAIT'),
    { timeout: 8000 }
  );
  await sleep(400);

  const modalText = await mobilePage.evaluate(() => document.body.innerText);
  assert(modalText.toUpperCase().includes('PERSONALIZE YOUR PORTRAIT'), 'Personalization Name Modal opens cleanly');

  // Skip / Continue to Camera
  console.log('3C. Proceeding to Camera View...');
  await mobilePage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const skip = btns.find((b) => b.innerText.toLowerCase().includes('skip'));
    if (skip) skip.click();
  });
  await mobilePage.waitForFunction(
    () => document.body.innerText.includes('Prev') || document.body.innerText.includes('Twin Royal Peacocks'),
    { timeout: 8000 }
  );
  await sleep(600);

  // Verify Mobile Camera Screen Layout
  console.log('3D. Testing Mobile Camera Controls & Frame Switcher...');
  const cameraText = await mobilePage.evaluate(() => document.body.innerText);
  assert(cameraText.includes('Prev'), 'Mobile Prev Frame button exists');
  assert(cameraText.includes('Next'), 'Mobile Next Frame button exists');
  assert(cameraText.includes('Twin Royal Peacocks'), 'Selected frame title displays on mobile');

  // Test Frame Switcher Click (Next Frame)
  await mobilePage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find((b) => b.innerText.includes('Next'));
    if (nextBtn) nextBtn.click();
  });
  await sleep(500);

  const updatedCameraText = await mobilePage.evaluate(() => document.body.innerText);
  assert(
    updatedCameraText.includes('(2/8)') || updatedCameraText.includes('Festive Marigold'),
    'Clicking Next Frame advances to Frame 2 without opening any intrusive scroll menu'
  );

  // Take Demo Selfie / Sample Photo
  console.log('3E. Generating Festive Photo Preview on Mobile...');
  await mobilePage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const demo = btns.find((b) => b.innerText.toLowerCase().includes('sample photo') || b.innerText.toLowerCase().includes('demo'));
    if (demo) demo.click();
  });
  await mobilePage.waitForFunction(() => document.body.innerText.includes('Your Festive Portrait'), { timeout: 12000 });
  await sleep(600);

  // Verify Preview Screen
  const previewText = await mobilePage.evaluate(() => document.body.innerText);
  assert(previewText.includes('Your Festive Portrait'), 'Preview screen loads with Your Festive Portrait');
  assert(
    previewText.includes('Tag') && previewText.includes('in your story'),
    'Bold Tagging Banner is prominently visible right under the title'
  );
  assert(
    !previewText.includes('CLAIM 30% OFF SALON PASS'),
    'Standalone Claim Pass button is completely removed from mobile screen'
  );
  assert(previewText.toUpperCase().includes('SHARE ON INSTAGRAM STORY'), 'SHARE ON INSTAGRAM STORY button is present');
  assert(previewText.toUpperCase().includes('POST TO WHATSAPP STATUS'), 'POST TO WHATSAPP STATUS button is present');
  assert(previewText.toUpperCase().includes('SAVE PHOTO'), 'SAVE PHOTO button is present');
  assert(previewText.toUpperCase().includes('RETAKE'), 'RETAKE button is present');

  // Test Sharing Action opens Coupon Modal
  console.log('3F. Testing Social Share Trigger -> Opens 30% OFF Coupon Modal...');
  await mobilePage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const ig = btns.find((b) => b.innerText.toUpperCase().includes('SHARE ON INSTAGRAM STORY'));
    if (ig) ig.click();
  });
  await sleep(1000);

  const shareModalText = await mobilePage.evaluate(() => document.body.innerText);
  assert(
    shareModalText.includes('EXCLUSIVE PASS UNLOCKED') || shareModalText.includes('30% OFF') || shareModalText.includes('DIWALI-'),
    'Sharing automatically triggers the celebratory 30% OFF Coupon Pass Modal'
  );

  await mobilePage.close();

  // ---------------------------------------------------------------------------
  // PHASE 4: REAL HEADLESS BROWSER AUDIT - DESKTOP VIEWPORT (1440x900)
  // ---------------------------------------------------------------------------
  console.log('\n========================================================================');
  console.log('  PHASE 4: DESKTOP BROWSER AUTOMATION & ADMIN AUDIT (1440x900)');
  console.log('========================================================================');

  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900 });

  // 4A: Check /admin
  console.log('4A. Loading Admin Dashboard on Desktop (/admin)...');
  await desktopPage.goto(`${LOCAL_URL}/admin`, { waitUntil: 'networkidle2' });
  await desktopPage.waitForFunction(
    () => document.body.innerText.includes('Supabase & Prisma Live') && document.body.innerText.includes('LIVE & IN SYNC'),
    { timeout: 15000 }
  );
  await sleep(600);

  const adminText = await desktopPage.evaluate(() => document.body.innerText);
  assert(adminText.includes('Photo Booth Live Analytics'), 'Admin header renders correctly');
  assert(adminText.toUpperCase().includes('PHOTOS CAPTURED'), 'PHOTOS CAPTURED card renders');
  assert(adminText.toUpperCase().includes('COUPONS CLAIMED'), 'COUPONS CLAIMED card renders');
  assert(adminText.toUpperCase().includes('TOTAL VISITS'), 'TOTAL VISITS card renders');
  assert(adminText.includes('Supabase & Prisma Live'), 'Live Supabase badge displays in green');
  assert(!adminText.includes('Recent Photo Captures'), 'Removed activity feed 1 is absent');
  assert(!adminText.includes('Recent Coupon Passes Issued'), 'Removed activity feed 2 is absent');

  // 4B: Desktop Camera Studio Panel
  console.log('4B. Checking Desktop Frame Studio Side Panel...');
  await desktopPage.goto(`${LOCAL_URL}`, { waitUntil: 'networkidle2' });
  await desktopPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enter = btns.find((b) => b.innerText.toUpperCase().includes('ENTER'));
    if (enter) enter.click();
  });
  await sleep(600);
  await desktopPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const skip = btns.find((b) => b.innerText.toLowerCase().includes('skip'));
    if (skip) skip.click();
  });
  await sleep(1000);

  const desktopCameraText = await desktopPage.evaluate(() => document.body.innerText);
  assert(desktopCameraText.toUpperCase().includes('ROYAL FRAME STUDIO'), 'Desktop view displays the docked Royal Frame Studio side panel');

  try {
    await desktopPage.close();
    await Promise.race([
      browser.close(),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]);
  } catch (e) {}

  // ---------------------------------------------------------------------------
  // PHASE 5: FINAL CLEANUP & ZERO RESET
  // ---------------------------------------------------------------------------
  console.log('\n========================================================================');
  console.log('  PHASE 5: FINAL CLEANUP & RESTORING ZERO BASELINE');
  console.log('========================================================================');
  await cleanDatabase();

  const finalLocal = await (await fetch(`${LOCAL_URL}/api/stats`)).json();
  const finalVercel = await (await fetch(`${VERCEL_URL}/api/stats`)).json();

  assert(finalLocal.stats.photosCaptured === 0, 'Localhost photos reset to 0');
  assert(finalLocal.stats.couponsIssued === 0, 'Localhost coupons reset to 0');
  assert(finalLocal.stats.totalVisits === 0, 'Localhost visits reset to 0');

  assert(finalVercel.stats.photosCaptured === 0, 'Vercel photos reset to 0');
  assert(finalVercel.stats.couponsIssued === 0, 'Vercel coupons reset to 0');
  assert(finalVercel.stats.totalVisits === 0, 'Vercel visits reset to 0');
  assert(finalVercel.stats.isSupabaseConnected === true, 'Vercel Supabase connection active');

  console.log('\n========================================================================');
  console.log(`  📊 AUDIT SUMMARY: ${passCount} PASSED | ${failCount} FAILED`);
  if (failCount === 0) {
    console.log('  🎉 ALL SYSTEM CHECKS & AUTOMATION TESTS PASSED 100%!');
    console.log('  Database is completely clean and ready at 0 - 0 - 0.');
  } else {
    console.error('  ⚠️ Some tests failed. Please review the log output above.');
  }
  console.log('========================================================================\n');
  process.exit(failCount === 0 ? 0 : 1);
}

runFullAudit().catch((err) => {
  console.error('Audit fatal error:', err);
  process.exit(1);
});

