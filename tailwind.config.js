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
        plum: {
          950: '#07010c',
          900: '#0e0316',
          850: '#14051f',
          800: '#1a0828',
          700: '#260c3b',
          600: '#381254',
        },
        marigold: {
          50: '#fffbf2',
          100: '#fef5e1',
          200: '#fbe7bd',
          300: '#f6d289',
          400: '#f2c14e',
          500: '#e8a33d',
          600: '#c98622',
          700: '#9d6316',
          800: '#754714',
          900: '#4e2d0d',
        },
        boutique: {
          ivory: '#f6ebdd',
          muted: '#a89cb5',
          dim: '#7a6e88',
          rose: '#9e1644',
          teal: '#0f8b8d',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        cinzel: ['var(--font-cinzel)', 'Cinzel', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'boutique-card': '0 16px 40px -10px rgba(0, 0, 0, 0.75), 0 1px 0 0 rgba(255, 235, 205, 0.08) inset',
        'boutique-elevated': '0 24px 60px -12px rgba(0, 0, 0, 0.85), 0 1px 0 0 rgba(232, 163, 61, 0.2) inset',
        'gold-soft': '0 4px 14px 0 rgba(232, 163, 61, 0.25)',
      },
      transitionTimingFunction: {
        'boutique': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
