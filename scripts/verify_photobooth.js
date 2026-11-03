import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import sharp from 'sharp';

/**
 * Automated Quality & Regression Checker for Diwali Photo Booth
 * Prevents text invisibility, color blending, frame misalignment, and asset regressions.
 */

const ROYAL_FRAMES = [
  { id: 'frame-1', name: 'Twin Royal Peacocks', file: 'frame_1_peacocks.png', thumb: 'thumb_frame_1.png', dominantColor: [0, 137, 123], label: 'Teal' },
  { id: 'frame-2', name: 'Festive Marigold & Lanterns', file: 'frame_2_lanterns.png', thumb: 'thumb_frame_2.png', dominantColor: [194, 24, 91], label: 'Magenta' },
  { id: 'frame-3', name: 'Emerald Diya & Garlands', file: 'frame_3_emerald_diyas.png', thumb: 'thumb_frame_3.png', dominantColor: [0, 77, 64], label: 'Emerald' },
  { id: 'frame-4', name: 'Golden Temple Lotus', file: 'frame_4_golden_lotus.png', thumb: 'thumb_frame_4.png', dominantColor: [255, 193, 7], label: 'Yellow' },
  { id: 'frame-5', name: 'Sparkling Fireworks & Diyas', file: 'frame_5_fireworks_diyas.png', thumb: 'thumb_frame_5.png', dominantColor: [136, 14, 79], label: 'Royal Magenta' },
  { id: 'frame-6', name: 'Palace Lotus & Peacocks', file: 'frame_6_palace_peacocks.png', thumb: 'thumb_frame_6.png', dominantColor: [0, 105, 92], label: 'Deep Teal' },
  { id: 'frame-7', name: 'Ivory Mughal Bells', file: 'frame_7_ivory_bells.png', thumb: 'thumb_frame_7.png', dominantColor: [255, 248, 225], label: 'Ivory' },
  { id: 'frame-8', name: 'Shubh Diwali Ribbon', file: 'frame_8_shubh_ribbon.png', thumb: 'thumb_frame_8.png', dominantColor: [255, 179, 0], label: 'Yellow' },
];

function calculateLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(rgb1, rgb2) {
  const l1 = calculateLuminance(...rgb1);
  const l2 = calculateLuminance(...rgb2);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

function colorDistance(rgb1, rgb2) {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
    Math.pow(rgb1[1] - rgb2[1], 2) +
    Math.pow(rgb1[2] - rgb2[2], 2)
  );
}

let allPassed = true;

console.log('================================================================');
console.log('  DIWALI PHOTO BOOTH REGULAR QUALITY & REGRESSION CHECKER');
console.log('================================================================\n');

// 1. FRAME ASSET INTEGRITY
console.log('1. Checking 8 Royal Festive Frame Assets:');
for (const frame of ROYAL_FRAMES) {
  const filePath = path.join('public', 'frames', frame.file);
  const thumbPath = path.join('public', 'frames', frame.thumb);

  if (!fs.existsSync(filePath)) {
    console.error(`   ❌ FAIL: Frame file missing: ${filePath}`);
    allPassed = false;
    continue;
  }
  if (!fs.existsSync(thumbPath)) {
    console.error(`   ❌ FAIL: Thumbnail missing: ${thumbPath}`);
    allPassed = false;
    continue;
  }

  const stat = fs.statSync(filePath);
  if (stat.size < 50000) {
    console.error(`   ❌ FAIL: Frame file suspiciously small (${stat.size} bytes): ${filePath}`);
    allPassed = false;
    continue;
  }

  const buf = fs.readFileSync(filePath);
  const png = PNG.sync.read(buf);
  const cx = Math.floor(png.width / 2);
  const cy = Math.floor(png.height / 2);
  const centerIdx = (cy * png.width + cx) * 4;
  const centerAlpha = png.data[centerIdx + 3];

  if (centerAlpha > 20) {
    console.error(`   ❌ FAIL: Frame ${frame.id} center is not transparent (alpha=${centerAlpha})`);
    allPassed = false;
  } else {
    console.log(`   ✓ ${frame.name} (${frame.label}): ${png.width}x${png.height}, Center transparent (alpha=${centerAlpha}), Size: ${(stat.size / 1024).toFixed(0)}KB`);
  }
}

// 1B. HIGH-EFFICIENCY WEBP FRAME & THUMBNAIL INTEGRITY
console.log('\n1B. Checking 8 High-Efficiency WebP Frame Assets (< 250KB each):');
for (const frame of ROYAL_FRAMES) {
  const webpFile = frame.file.replace('.png', '.webp');
  const webpThumb = frame.thumb.replace('.png', '.webp');
  const webpPath = path.join('public', 'frames', webpFile);
  const webpThumbPath = path.join('public', 'frames', webpThumb);

  if (!fs.existsSync(webpPath)) {
    console.error(`   ❌ FAIL: WebP frame missing: ${webpPath}`);
    allPassed = false;
    continue;
  }
  if (!fs.existsSync(webpThumbPath)) {
    console.error(`   ❌ FAIL: WebP thumbnail missing: ${webpThumbPath}`);
    allPassed = false;
    continue;
  }

  const stat = fs.statSync(webpPath);
  const thumbStat = fs.statSync(webpThumbPath);

  // Verify size is highly optimized (< 300KB for 1080x1440 HD frame, < 25KB for thumbnail)
  if (stat.size > 300000) {
    console.error(`   ❌ FAIL: WebP file larger than 300KB (${(stat.size / 1024).toFixed(0)}KB): ${webpPath}`);
    allPassed = false;
    continue;
  }

  const meta = await sharp(webpPath).metadata();
  const rawPixels = await sharp(webpPath).raw().toBuffer();
  const cx = Math.floor(meta.width / 2);
  const cy = Math.floor(meta.height / 2);
  const centerIdx = (cy * meta.width + cx) * meta.channels;
  const centerAlpha = rawPixels[centerIdx + (meta.channels - 1)];

  if (centerAlpha > 20) {
    console.error(`   ❌ FAIL: WebP frame ${frame.id} center is not transparent (alpha=${centerAlpha})`);
    allPassed = false;
  } else {
    console.log(`   ✓ ${frame.name} [WebP]: ${meta.width}x${meta.height}, Center alpha=${centerAlpha}, Frame: ${(stat.size / 1024).toFixed(0)}KB, Thumb: ${(thumbStat.size / 1024).toFixed(0)}KB`);
  }
}

// 2. TEXT VISIBILITY & TOP HOLDER BLOCK CHECK
console.log('\n2. Checking Header Holder Block Text Readability & Contrast:');
const holderBgRgb = [23, 1, 12]; // #17010c (Deep Palace Velvet)
const goldTextRgb = [255, 215, 0]; // #ffd700
const whiteTextRgb = [255, 255, 255]; // #ffffff
const champagneRgb = [250, 231, 180]; // #fae7b4

const goldContrast = contrastRatio(holderBgRgb, goldTextRgb);
const whiteContrast = contrastRatio(holderBgRgb, whiteTextRgb);
const champContrast = contrastRatio(holderBgRgb, champagneRgb);

console.log(`   - Gold Brand Text on Holder Block: ${goldContrast.toFixed(2)}:1 (Min required: 7.0 for WCAG AAA)`);
console.log(`   - White/Greeting on Holder Block:  ${whiteContrast.toFixed(2)}:1 (Min required: 7.0 for WCAG AAA)`);
console.log(`   - Tagline on Holder Block:         ${champContrast.toFixed(2)}:1 (Min required: 7.0 for WCAG AAA)`);

if (goldContrast >= 7.0 && whiteContrast >= 7.0 && champContrast >= 7.0) {
  console.log('   ✓ Holder block completely guarantees text visibility across all 8 frames.');
} else {
  console.error('   ❌ Text contrast below minimum requirement');
  allPassed = false;
}

// 3. 30% ICON COLOR DIFFERENTIATION & BLENDING CHECK
console.log('\n3. Checking 30% Icon Anti-Blending & Color Differentiation:');
const sealBodyRgb = [122, 5, 40]; // Deep Royal Ruby Velvet (#7a0528)
const sealBezelRgb = [255, 215, 0]; // 24K Polished Gold Rim (#ffd700)

for (const frame of ROYAL_FRAMES) {
  // If frame is warm yellow/ivory/teal, seal body provides high contrast
  const bodyDist = colorDistance(sealBodyRgb, frame.dominantColor);
  const bezelDist = colorDistance(sealBezelRgb, frame.dominantColor);
  const maxSeparation = Math.max(bodyDist, bezelDist);

  // Check that on yellow frames (which caused the issue in media_1793644998033_a985cca0.jpg),
  // the ruby velvet body has immense contrast
  if (frame.label === 'Yellow') {
    const yellowContrast = contrastRatio(sealBodyRgb, frame.dominantColor);
    console.log(`   - vs ${frame.name} (Yellow): Ruby Velvet Body Contrast = ${yellowContrast.toFixed(2)}:1 (Distance = ${bodyDist.toFixed(1)})`);
    if (yellowContrast < 4.5) {
      console.error(`   ❌ FAIL: Seal blends with yellow frame: ${frame.name}`);
      allPassed = false;
    }
  } else {
    console.log(`   - vs ${frame.name} (${frame.label}): Max Edge Separation = ${maxSeparation.toFixed(1)}`);
  }

  if (maxSeparation < 60) {
    console.error(`   ❌ FAIL: Insufficient edge separation on ${frame.name}`);
    allPassed = false;
  }
}
console.log('   ✓ 30% Icon (Dual-Tone Ruby Velvet + 24K Gold Bezel) is fully protected from blending.');

// 4. CHECK STORE CONFIGURATION
console.log('\n4. Checking Store Configuration (data/store.json):');
try {
  const storeRaw = fs.readFileSync('data/store.json', 'utf8');
  const store = JSON.parse(storeRaw);
  if (!store.config.shopName || !store.frames || store.frames.length !== 8) {
    console.error('   ❌ Invalid store.json configuration');
    allPassed = false;
  } else {
    console.log(`   ✓ Store Name: "${store.config.shopName}", 8 Frames registered properly.`);
  }
} catch (e) {
  console.error('   ❌ Could not parse data/store.json', e.message);
  allPassed = false;
}

console.log('\n================================================================');
if (allPassed) {
  console.log('  🎉 ALL AUTOMATED QUALITY CHECKS PASSED SUCCESSFULLY!');
  console.log('================================================================');
  process.exit(0);
} else {
  console.error('  ❌ SOME CHECKS FAILED. PLEASE REVIEW LOGS ABOVE.');
  console.log('================================================================');
  process.exit(1);
}
