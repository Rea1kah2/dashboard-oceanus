/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#060E1B',
          900: '#0A1628',
          850: '#0C1B33',
          800: '#0F2240',
          750: '#122A4F',
          700: '#152D55',
          600: '#183E75',
          500: '#1B4F8A',
          400: '#2A6BB8',
          300: '#3B82C4',
        },
        signal: {
          DEFAULT: '#38BDF8',
          glow: '#0284C7',
          dim: '#0EA5E9',
        },
        coral: {
          DEFAULT: '#F87171',
          dim: '#EF4444',
        },
        sand: {
          DEFAULT: '#E8D5B0',
          light: '#F4ECE1',
        },
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
