/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f8',
          100: '#d4ddee',
          200: '#a9bbdc',
          300: '#7e94c9',
          400: '#546cb3',
          500: '#3a4f8f',
          600: '#2a3a6f',
          700: '#1d2a52',
          800: '#14203f',
          900: '#0c1630',
          950: '#070d1f',
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0cc',
          200: '#f4df95',
          300: '#edc757',
          400: '#e3af2a',
          500: '#c9921a',
          600: '#a4713f', // placeholder
          700: '#7a4f12',
          800: '#5e3d10',
          900: '#4a3010',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 0 1px rgba(227,175,42,0.3), 0 10px 40px -10px rgba(227,175,42,0.35)',
        'soft': '0 20px 60px -20px rgba(12,22,48,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'kenburns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'kenburns': 'kenburns 18s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
