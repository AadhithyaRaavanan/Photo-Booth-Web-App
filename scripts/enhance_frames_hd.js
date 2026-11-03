import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const userFrames = [
  {
    id: 'frame-1',
    name: 'Twin Royal Peacocks',
    src: 'C:/Users/Hp/.gemini/antigravity/brain/10f30304-3265-4bbd-8277-8a00e5b10e41/.user_uploaded/media_1793643811752_3b37c062.png',
    fileName: 'frame_1_peacocks.png',
    thumbName: 'thumb_frame_1.png'
  },
  {
    id: 'frame-2',
    name: 'Festive Marigold & Lanterns',
    src: 'C:/Users/Hp/.gemini/antigravity/brain/10f30304-3265-4bbd-8277-8a00e5b10e41/.user_uploaded/media_1793643811752_74aacab0.png',
    fileName: 'frame_2_lanterns.png',
    thumbName: 'thumb_frame_2.png'
  },
  {
    id: 'frame-3',
    name: 'Emerald Diya & Garlands',
    src: 'C:/Users/Hp/.gemini/antigravity/brain/10f30304-3265-4bbd-8277-8a00e5b10e41/.user_uploaded/media_1793643811755_44323473.png',
    fileName: 'frame_3_emerald_diyas.png',
    thumbName: 'thumb_frame_3.png'
  },
  {
    id: 'frame-4',
    name: 'Golden Temple Lotus',
    src: 'C:/Users/Hp/.gemini/antigravity/brain/10f30304-3265-4bbd-8277-8a00e5b10e41/.user_uploaded/media_1793643811754_6c4ab899.png',
    fileName: 'frame_4_golden_lotus.png',
    thumbName: 'thumb_frame_4.png'
  },
  {
    id: 'frame-5',
    name: 'Sparkling Fireworks & Diyas',
    src: 'C:/Users/Hp/.gemini/antigravity/brain/10f30304-3265-4bbd-8277-8a00e5b10e41/.user_uploaded/media_1793643841037_13a41d66.png',
    fileName: 'frame_5_fireworks_diyas.png',
    thumbName: 'thumb_frame_5.png'
  },
  {
    id: 'frame-6',
    name: 'Palace Lotus & Peacocks',
    src: 'C:/Users/Hp/.gemini/antigravity/brain/10f30304-3265-4bbd-8277-8a00e5b10e41/.user_uploaded/media_1793643841041_298e8228.png',
    fileName: 'frame_6_palace_peacocks.png',
    thumbName: 'thumb_frame_6.png'
  },
  {
    id: 'frame-7',
    name: 'Ivory Mughal Bells',
    src: 'C:/Users/Hp/.gemini/antigravity/brain/10f30304-3265-4bbd-8277-8a00e5b10e41/.user_uploaded/media_1793643841068_77529219.png',
    fileName: 'frame_7_ivory_bells.png',
    thumbName: 'thumb_frame_7.png'
  },
  {
    id: 'frame-8',
    name: 'Shubh Diwali Ribbon',
    src: 'C:/Users/Hp/.gemini/antigravity/brain/10f30304-3265-4bbd-8277-8a00e5b10e41/.user_uploaded/media_1793643841098_4969906c.png',
    fileName: 'frame_8_shubh_ribbon.png',
    thumbName: 'thumb_frame_8.png'
  }
];

// Target Ultra-HD Portrait Canvas Dimensions (1080 x 1440 - exact 1:1 match with Photo Canvas)
const TARGET_W = 1080;
const TARGET_H = 1440;

// High-DPI Retina Thumbnails (240 x 320 for 120 x 160 display)
const THUMB_W = 240;
const THUMB_H = 320;

async function processAll() {
  console.log('================================================================');
  console.log('  STARTING ULTRA-HD FRAME RESAMPLING & SHARPENING PIPELINE');
  console.log('================================================================\n');

  for (const f of userFrames) {
    console.log(`Processing ${f.name} (${f.id})...`);

    // 1. Load source and perform high-fidelity Lanczos3 upscaling + vibrancy modulation + smart sharpening
    const upscaled = await sharp(f.src)
      .resize(TARGET_W, TARGET_H, {
        kernel: sharp.kernel.lanczos3,
        fit: 'fill'
      })
      .modulate({
        saturation: 1.05,
        brightness: 1.01
      })
      .sharpen({
        sigma: 1.15,
        m1: 1.7,
        m2: 0.75
      })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = upscaled;
    const pixelCount = TARGET_W * TARGET_H;

    // 2. Alpha channel cleanup:
    // Any pixel with alpha <= 25 becomes strictly 0 (pure transparent opening, no haze)
    // Any pixel with alpha >= 235 becomes strictly 255 (solid, crisp border art)
    // Subtle transition in between ensures smooth anti-aliased edge curves.
    for (let i = 0; i < pixelCount; i++) {
      const aIdx = i * 4 + 3;
      const alpha = data[aIdx];
      if (alpha <= 25) {
        data[aIdx] = 0;
        data[aIdx - 1] = 0;
        data[aIdx - 2] = 0;
        data[aIdx - 3] = 0;
      } else if (alpha >= 235) {
        data[aIdx] = 255;
      }
    }

    // 3. Save Ultra-HD Frame PNG
    const outPath = path.join('public', 'frames', f.fileName);
    await sharp(data, {
      raw: {
        width: TARGET_W,
        height: TARGET_H,
        channels: 4
      }
    })
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .toFile(outPath);

    const outStat = fs.statSync(outPath);
    console.log(`   ✓ Saved Ultra-HD Frame: ${outPath} (${TARGET_W}x${TARGET_H}, ${(outStat.size / 1024).toFixed(0)} KB)`);

    // 4. Generate High-DPI Retina Thumbnail (240 x 320)
    // Compose over a warm festive studio backdrop so users see how photos look inside the frame
    const thumbRaw = await sharp(f.src)
      .resize(THUMB_W, THUMB_H, {
        kernel: sharp.kernel.lanczos3,
        fit: 'fill'
      })
      .sharpen({
        sigma: 1.0,
        m1: 1.5,
        m2: 0.8
      })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const thumbData = thumbRaw.data;
    const thumbPixels = THUMB_W * THUMB_H;

    for (let i = 0; i < thumbPixels; i++) {
      const aIdx = i * 4 + 3;
      const alpha = thumbData[aIdx];
      if (alpha < 50) {
        // Deep royal velvet placeholder interior (#1e0614)
        thumbData[aIdx - 3] = 30; // R
        thumbData[aIdx - 2] = 6;  // G
        thumbData[aIdx - 1] = 20; // B
        thumbData[aIdx] = 255;    // A
      }
    }

    const thumbOutPath = path.join('public', 'frames', f.thumbName);
    await sharp(thumbData, {
      raw: {
        width: THUMB_W,
        height: THUMB_H,
        channels: 4
      }
    })
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true
      })
      .toFile(thumbOutPath);

    const thumbStat = fs.statSync(thumbOutPath);
    console.log(`   ✓ Saved Retina Thumbnail: ${thumbOutPath} (${THUMB_W}x${THUMB_H}, ${(thumbStat.size / 1024).toFixed(0)} KB)`);
  }

  console.log('\n🎉 ALL 8 FRAMES AND RETINA THUMBNAILS ENHANCED TO ULTRA-HD SUCCESSFULLY!');
}

processAll().catch(err => {
  console.error('Processing failed:', err);
  process.exit(1);
});

