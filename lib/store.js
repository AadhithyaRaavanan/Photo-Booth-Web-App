import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const initialData = {
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

export function getStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading store file, falling back to initial data', err);
  }
  saveStore(initialData);
  return initialData;
}

export function saveStore(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing store file', err);
  }
}

export function generateCouponCode(customerName) {
  const cleanName = (customerName || 'VIP').replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `DIWALI-${cleanName}-${randomNum}`;
}

