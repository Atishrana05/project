/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#12364b',
          100: '#1b435a',
          200: '#30556f',
          300: '#54748a',
          400: '#7794a7',
          500: '#9eb4c2',
          600: '#c0d0d9',
          700: '#dce6ec',
          800: '#edf3f6',
          900: '#f6f9fb',
          950: '#ffffff',
        },
        gold: {
          50: '#f2f7fa',
          100: '#e2edf3',
          200: '#c6dbe6',
          300: '#4c7893',
          400: '#315f7a',
          500: '#234f69',
          600: '#1e455d',
          700: '#193b50',
          800: '#143144',
          900: '#102838',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 0 1px rgba(49,95,122,0.18), 0 10px 40px -10px rgba(49,95,122,0.18)',
        'soft': '0 20px 60px -20px rgba(18,54,75,0.16)',
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
