import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const FRAMES = [
  { id: 'frame-1', file: 'frame_1_peacocks.png', webp: 'frame_1_peacocks.webp', thumb: 'thumb_frame_1.png', thumbWebp: 'thumb_frame_1.webp' },
  { id: 'frame-2', file: 'frame_2_lanterns.png', webp: 'frame_2_lanterns.webp', thumb: 'thumb_frame_2.png', thumbWebp: 'thumb_frame_2.webp' },
  { id: 'frame-3', file: 'frame_3_emerald_diyas.png', webp: 'frame_3_emerald_diyas.webp', thumb: 'thumb_frame_3.png', thumbWebp: 'thumb_frame_3.webp' },
  { id: 'frame-4', file: 'frame_4_golden_lotus.png', webp: 'frame_4_golden_lotus.webp', thumb: 'thumb_frame_4.png', thumbWebp: 'thumb_frame_4.webp' },
  { id: 'frame-5', file: 'frame_5_fireworks_diyas.png', webp: 'frame_5_fireworks_diyas.webp', thumb: 'thumb_frame_5.png', thumbWebp: 'thumb_frame_5.webp' },
  { id: 'frame-6', file: 'frame_6_palace_peacocks.png', webp: 'frame_6_palace_peacocks.webp', thumb: 'thumb_frame_6.png', thumbWebp: 'thumb_frame_6.webp' },
  { id: 'frame-7', file: 'frame_7_ivory_bells.png', webp: 'frame_7_ivory_bells.webp', thumb: 'thumb_frame_7.png', thumbWebp: 'thumb_frame_7.webp' },
  { id: 'frame-8', file: 'frame_8_shubh_ribbon.png', webp: 'frame_8_shubh_ribbon.webp', thumb: 'thumb_frame_8.png', thumbWebp: 'thumb_frame_8.webp' },
];

async function convertAll() {
  console.log('================================================================');
  console.log('  CONVERTING ALL 8 ROYAL FESTIVE FRAMES & THUMBNAILS TO WEBP');
  console.log('================================================================\n');

  let totalPngBytes = 0;
  let totalWebpBytes = 0;

  for (const item of FRAMES) {
    const pngPath = path.join('public', 'frames', item.file);
    const webpPath = path.join('public', 'frames', item.webp);
    const thumbPngPath = path.join('public', 'frames', item.thumb);
    const thumbWebpPath = path.join('public', 'frames', item.thumbWebp);

    const pngStat = fs.statSync(pngPath);
    totalPngBytes += pngStat.size;

    // Convert HD frame with near-lossless high-fidelity WebP (quality 92, alpha quality 100)
    await sharp(pngPath)
      .webp({ quality: 92, effort: 6, alphaQuality: 100 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    totalWebpBytes += webpStat.size;

    // Verify center transparency
    const rawPixels = await sharp(webpPath).raw().toBuffer();
    const meta = await sharp(webpPath).metadata();
    const cx = Math.floor(meta.width / 2);
    const cy = Math.floor(meta.height / 2);
    const centerAlpha = rawPixels[(cy * meta.width + cx) * meta.channels + (meta.channels - 1)];

    console.log(`✓ ${item.id}: ${(pngStat.size / 1024).toFixed(0)} KB -> ${(webpStat.size / 1024).toFixed(0)} KB (${((1 - webpStat.size / pngStat.size) * 100).toFixed(1)}% saved) [Center alpha: ${centerAlpha}]`);

    // Convert Thumbnail (resized to clean 180x240 for crisp mobile display, quality 85)
    if (fs.existsSync(thumbPngPath)) {
      const thumbPngStat = fs.statSync(thumbPngPath);
      totalPngBytes += thumbPngStat.size;

      await sharp(thumbPngPath)
        .resize(180, 240, { fit: 'cover' })
        .webp({ quality: 85, effort: 6 })
        .toFile(thumbWebpPath);

      const thumbWebpStat = fs.statSync(thumbWebpPath);
      totalWebpBytes += thumbWebpStat.size;

      console.log(`   thumb: ${(thumbPngStat.size / 1024).toFixed(0)} KB -> ${(thumbWebpStat.size / 1024).toFixed(0)} KB`);
    }
  }

  console.log('\n================================================================');
  console.log(`TOTAL BANDWIDTH: ${(totalPngBytes / (1024 * 1024)).toFixed(2)} MB -> ${(totalWebpBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`SAVINGS: ${(((totalPngBytes - totalWebpBytes) / totalPngBytes) * 100).toFixed(1)}% reduction!`);
  console.log('================================================================');
}

convertAll().catch(console.error);

