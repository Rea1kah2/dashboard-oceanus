function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variableName}) / ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          950: withOpacity('--ocean-950'),
          900: withOpacity('--ocean-900'),
          850: withOpacity('--ocean-850'),
          800: withOpacity('--ocean-800'),
          750: withOpacity('--ocean-750'),
          700: withOpacity('--ocean-700'),
          600: withOpacity('--ocean-600'),
          500: withOpacity('--ocean-500'),
          400: withOpacity('--ocean-400'),
          300: withOpacity('--ocean-300'),
        },
        signal: {
          DEFAULT: withOpacity('--signal'),
          glow: withOpacity('--signal-glow'),
          dim: withOpacity('--signal-dim'),
        },
        coral: {
          DEFAULT: withOpacity('--coral'),
          dim: withOpacity('--coral'),
        },
        sand: {
          DEFAULT: withOpacity('--sand'),
          light: withOpacity('--sand'),
        },
        'text-primary': withOpacity('--text-primary'),
        'text-secondary': withOpacity('--text-secondary'),
        'text-muted': withOpacity('--text-muted'),
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
