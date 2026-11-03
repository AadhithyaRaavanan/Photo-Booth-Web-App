import './globals.css';

export const metadata = {
  title: 'Dream Salon | Royal Festive Photo Booth & Exclusive 30% OFF Reward',
  description: 'Capture your Diwali moments with luxury festive frames, share with friends, and unlock an exclusive store discount!',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪔</text></svg>",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0e0217',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@500;600;700;800;900&family=Marcellus&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Rozha+One&display=swap"
          rel="stylesheet"
        />
        {/* Preload the primary high-priority frame in WebP for instantaneous display */}
        <link rel="preload" as="image" href="/frames/frame_1_peacocks.webp" type="image/webp" />
      </head>
      <body className="bg-black text-champagne min-h-screen selection:bg-cyan-400 selection:text-black relative">
        {children}
      </body>
    </html>
  );
}
