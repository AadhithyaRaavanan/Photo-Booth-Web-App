/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          darkest: '#0e0217',
          dark: '#180426',
          purple: '#28083f',
          plum: '#3e072b',
          burgundy: '#580c2e',
          accent: '#ff8a00',
          orange: '#ff6200',
        },
        gold: {
          50: '#fffbf0',
          100: '#fdf4dc',
          200: '#fae7b4',
          300: '#f6d584',
          400: '#f1be52',
          500: '#d4af37',
          600: '#b78e24',
          700: '#8f6a19',
          800: '#6d4f17',
          900: '#4a3410',
        },
        champagne: {
          light: '#fff8ea',
          DEFAULT: '#f7ebd2',
          dark: '#e5d1a8',
        }
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        heading: ['var(--font-cinzel)', 'serif'],
        festive: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45)',
        'gold-glow-lg': '0 0 45px rgba(212, 175, 55, 0.65)',
        'purple-glow': '0 0 35px rgba(115, 20, 115, 0.5)',
        'diya': '0 0 20px rgba(255, 140, 0, 0.7), 0 0 40px rgba(255, 87, 34, 0.4)',
      },
      animation: {
        'flame': 'flame 1.5s ease-in-out infinite alternate',
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '100%': { transform: 'scale(1.1) rotate(2deg)', opacity: '1', filter: 'drop-shadow(0 0 12px #ff9800)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
