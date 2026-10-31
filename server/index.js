import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Data storage file
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default state
const initialData = {
  config: {
    shopName: "Dream Salon",
    shopTagline: "BEAUTY · STYLE · CONFIDENCE",
    campaignHeadline: "Celebrate Diwali in Style!",
    campaignSubtext: "Capture your festive moments and unlock an exclusive surprise.",
    defaultDiscount: "30%",
    instagramTag: "@DreamSalon",
    partnerTag: "@ZenXea",
    validityDate: "Nov 25, 2026",
    adminPin: "1234",
  },
  frames: [
    {
      id: "frame-1",
      name: "Royal Diwali",
      discount: "FLAT 30% OFF",
      theme: "purple-gold",
      description: "Rich royal purple with hanging lanterns and marigolds",
      active: true,
    },
    {
      id: "frame-2",
      name: "Purple Elegance",
      discount: "FLAT 30% OFF",
      theme: "plum-gold",
      description: "Imperial plum background with golden filigree arches",
      active: true,
    },
    {
      id: "frame-3",
      name: "Traditional",
      discount: "FLAT 30% OFF",
      theme: "marigold-orange",
      description: "Vibrant yellow-orange marigold garlands and sacred diyas",
      active: true,
    },
    {
      id: "frame-4",
      name: "Minimal Luxury",
      discount: "FLAT 30% OFF",
      theme: "ivory-gold",
      description: "Warm ivory and champagne gold minimalist luxury border",
      active: true,
    },
    {
      id: "frame-5",
      name: "Black & Gold",
      discount: "FLAT 30% OFF",
      theme: "black-gold",
      description: "Midnight noir with 24K gold filigree floral embossing",
      active: true,
    },
    {
      id: "frame-6",
      name: "Floral Celebration",
      discount: "FLAT 30% OFF",
      theme: "magenta-floral",
      description: "Blooming lotus, festive marigolds, and violet petals",
      active: true,
    },
    {
      id: "frame-7",
      name: "Festive Glamour",
      discount: "FLAT 30% OFF",
      theme: "glamour-purple",
      description: "Cascading golden fairy lights and royal diwali ambiance",
      active: true,
    },
    {
      id: "frame-8",
      name: "Family Celebration",
      discount: "FLAT 30% OFF",
      theme: "warm-amber",
      description: "Warm festive amber with glowing diyas and floral wreath",
      active: true,
    },
  ],
  submissions: [
    {
      id: "sub-101",
      customerName: "Aanya Sharma",
      phone: "+91 98765 43210",
      frameId: "frame-1",
      frameName: "Royal Diwali",
      discount: "FLAT 30% OFF",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      screenshotUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      status: "APPROVED",
      couponCode: "DIWALI-AAN-8421",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      verifiedAt: new Date(Date.now() - 3600000).toISOString(),
      isRedeemed: false,
    },
    {
      id: "sub-102",
      customerName: "Rohan Kapoor",
      phone: "+91 91234 56789",
      frameId: "frame-3",
      frameName: "Traditional",
      discount: "FLAT 30% OFF",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      screenshotUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      status: "PENDING",
      couponCode: null,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      verifiedAt: null,
      isRedeemed: false,
    }
  ],
  stats: {
    totalVisits: 148,
    photosCaptured: 89,
    sharesSubmitted: 52,
    couponsIssued: 41,
    couponsRedeemed: 19,
  }
};

// Helper: load DB
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading store.json, using defaults", e);
  }
  saveData(initialData);
  return initialData;
}

// Helper: save DB
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error("Error writing store.json", e);
  }
}

// Helper: generate unique coupon code
function generateCouponCode(customerName) {
  const cleanName = (customerName || 'VIP').replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `DIWALI-${cleanName}-${randomNum}`;
}

// Routes

// 1. GET /api/config
app.get('/api/config', (req, res) => {
  const db = loadData();
  res.json({ success: true, config: db.config });
});

// 2. PUT /api/config
app.put('/api/config', (req, res) => {
  const db = loadData();
  db.config = { ...db.config, ...req.body };
  saveData(db);
  res.json({ success: true, config: db.config, message: "Shop settings updated successfully" });
});

// 3. GET /api/frames
app.get('/api/frames', (req, res) => {
  const db = loadData();
  res.json({ success: true, frames: db.frames });
});

// 4. PUT /api/frames/:id
app.put('/api/frames/:id', (req, res) => {
  const db = loadData();
  const frameIndex = db.frames.findIndex(f => f.id === req.params.id);
  if (frameIndex === -1) {
    return res.status(404).json({ success: false, message: "Frame not found" });
  }
  db.frames[frameIndex] = { ...db.frames[frameIndex], ...req.body };
  saveData(db);
  res.json({ success: true, frame: db.frames[frameIndex], message: "Frame updated" });
});

// 5. POST /api/submissions (Customer submits photo + screenshot)
app.post('/api/submissions', (req, res) => {
  const db = loadData();
  const { customerName, phone, frameId, discount, photoData, screenshotData } = req.body;

  const frame = db.frames.find(f => f.id === frameId) || db.frames[0];
  const submissionId = `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newSubmission = {
    id: submissionId,
    customerName: customerName || "Valued Guest",
    phone: phone || "",
    frameId: frame.id,
    frameName: frame.name,
    discount: discount || frame.discount || "FLAT 30% OFF",
    photoUrl: photoData || "",
    screenshotUrl: screenshotData || "",
    status: "PENDING",
    couponCode: null,
    createdAt: new Date().toISOString(),
    verifiedAt: null,
    isRedeemed: false,
  };

  db.submissions.unshift(newSubmission);
  db.stats.photosCaptured += 1;
  db.stats.sharesSubmitted += 1;
  saveData(db);

  res.status(201).json({
    success: true,
    submission: newSubmission,
    message: "Screenshot received and submitted for verification"
  });
});

// 6. GET /api/submissions (Admin list)
app.get('/api/submissions', (req, res) => {
  const db = loadData();
  res.json({ success: true, submissions: db.submissions });
});

// 7. GET /api/submissions/:id (Polling customer verification status)
app.get('/api/submissions/:id', (req, res) => {
  const db = loadData();
  const sub = db.submissions.find(s => s.id === req.params.id);
  if (!sub) {
    return res.status(404).json({ success: false, message: "Submission not found" });
  }
  res.json({ success: true, submission: sub });
});

// 8. PATCH /api/submissions/:id/status (Admin approval / rejection)
app.patch('/api/submissions/:id/status', (req, res) => {
  const db = loadData();
  const { status, rejectionReason } = req.body;
  const subIndex = db.submissions.findIndex(s => s.id === req.params.id);

  if (subIndex === -1) {
    return res.status(404).json({ success: false, message: "Submission not found" });
  }

  const sub = db.submissions[subIndex];
  sub.status = status; // 'APPROVED' or 'REJECTED' or 'PENDING'

  if (status === 'APPROVED') {
    if (!sub.couponCode) {
      sub.couponCode = generateCouponCode(sub.customerName);
      sub.verifiedAt = new Date().toISOString();
      db.stats.couponsIssued += 1;
    }
  } else if (status === 'REJECTED') {
    sub.rejectionReason = rejectionReason || "Story screenshot could not be verified";
  }

  db.submissions[subIndex] = sub;
  saveData(db);

  res.json({
    success: true,
    submission: sub,
    message: `Submission marked as ${status}`
  });
});

// 9. GET /api/coupons/lookup/:code (Cashier terminal coupon lookup)
app.get('/api/coupons/lookup/:code', (req, res) => {
  const db = loadData();
  const code = (req.params.code || '').trim().toUpperCase();
  const sub = db.submissions.find(s => s.couponCode && s.couponCode.toUpperCase() === code);

  if (!sub) {
    return res.status(404).json({ success: false, message: "Invalid coupon code. Not found in records." });
  }

  res.json({
    success: true,
    coupon: {
      code: sub.couponCode,
      customerName: sub.customerName,
      discount: sub.discount,
      status: sub.status,
      isRedeemed: sub.isRedeemed,
      redeemedAt: sub.redeemedAt || null,
      validUntil: db.config.validityDate,
      shopName: db.config.shopName,
    }
  });
});

// 10. POST /api/coupons/redeem (Cashier marks coupon as redeemed)
app.post('/api/coupons/redeem', (req, res) => {
  const db = loadData();
  const { code } = req.body;
  const cleanCode = (code || '').trim().toUpperCase();
  const subIndex = db.submissions.findIndex(s => s.couponCode && s.couponCode.toUpperCase() === cleanCode);

  if (subIndex === -1) {
    return res.status(404).json({ success: false, message: "Coupon code not found." });
  }

  const sub = db.submissions[subIndex];
  if (sub.isRedeemed) {
    return res.status(400).json({
      success: false,
      message: `Coupon was already redeemed on ${new Date(sub.redeemedAt).toLocaleDateString()} at ${new Date(sub.redeemedAt).toLocaleTimeString()}`,
      redeemedAt: sub.redeemedAt,
    });
  }

  sub.isRedeemed = true;
  sub.redeemedAt = new Date().toISOString();
  db.stats.couponsRedeemed += 1;
  db.submissions[subIndex] = sub;
  saveData(db);

  res.json({
    success: true,
    message: "Coupon successfully verified and redeemed!",
    coupon: sub
  });
});

// 11. GET /api/stats (Admin stats)
app.get('/api/stats', (req, res) => {
  const db = loadData();
  const totalSubmissions = db.submissions.length;
  const pendingCount = db.submissions.filter(s => s.status === 'PENDING').length;
  const approvedCount = db.submissions.filter(s => s.status === 'APPROVED').length;
  const redeemedCount = db.submissions.filter(s => s.isRedeemed).length;

  res.json({
    success: true,
    stats: {
      totalVisits: db.stats.totalVisits,
      photosCaptured: db.stats.photosCaptured,
      sharesSubmitted: db.stats.sharesSubmitted,
      pendingVerifications: pendingCount,
      couponsIssued: approvedCount,
      couponsRedeemed: redeemedCount,
    }
  });
});

// Track page visit
app.post('/api/track-visit', (req, res) => {
  const db = loadData();
  db.stats.totalVisits += 1;
  saveData(db);
  res.json({ success: true });
});

// Serve static frontend assets if built
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✨ Festive Photo Booth Server running on http://localhost:${PORT}`);
});

