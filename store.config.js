/**
 * ==============================================================================
 * 🪔 STORE MASTER CONFIGURATION (store.config.js)
 * ==============================================================================
 * This single configuration file controls all important store details, branding,
 * promotional copy, discounts, and social tags across the entire web app.
 *
 * It automatically reads from environment variables (.env / .env.local) if present,
 * with clean defaults below.
 *
 * To sell this photo booth app to multiple different stores, simply update the values
 * below or edit the .env file!
 */

const storeConfig = {
  // Store & Brand Identity
  shopName: process.env.NEXT_PUBLIC_SHOP_NAME || 'Dream Salon',
  shopTagline: process.env.NEXT_PUBLIC_SHOP_TAGLINE || 'BEAUTY · STYLE · CONFIDENCE',
  storeAddress: process.env.NEXT_PUBLIC_STORE_ADDRESS || '123 Royal Festive Promenade, Festive City',
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210',

  // Campaign & Promotional Headline
  campaignHeadline: process.env.NEXT_PUBLIC_CAMPAIGN_HEADLINE || 'DIWALI PARTY',
  campaignSubtext:
    process.env.NEXT_PUBLIC_CAMPAIGN_SUBTEXT ||
    'Capture your radiant celebration, frame your festive portrait with authentic royal palace frames, and unlock your exclusive discount pass.',

  // Discount & Offers
  defaultDiscount: process.env.NEXT_PUBLIC_DEFAULT_DISCOUNT || '30%',
  discountLabel: process.env.NEXT_PUBLIC_DISCOUNT_LABEL || 'FLAT 30% OFF',
  validityDate: process.env.NEXT_PUBLIC_VALIDITY_DATE || 'Nov 25, 2026',

  // Social Handles to Tag in Instagram Story & WhatsApp
  instagramTag: process.env.NEXT_PUBLIC_INSTAGRAM_TAG || '@DreamSalon',
  partnerTag: process.env.NEXT_PUBLIC_PARTNER_TAG || '@ZenXea',
  shareHashtags: process.env.NEXT_PUBLIC_SHARE_HASHTAGS || '#DiwaliFestive #DreamSalon #FestiveLook',

  // Administrative PIN for In-Store Dashboard / Validation
  adminPin: process.env.ADMIN_PIN || '1234',
};

export default storeConfig;

