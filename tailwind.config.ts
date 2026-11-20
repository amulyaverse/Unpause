/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // UNPAUSE Design System Colors
        'deep-purple': {
          DEFAULT: '#30205C',
          dark: '#211542',
          light: '#422D7A',
        },
        'electric-lavender': {
          DEFAULT: '#7655E9',
          hover: '#6342D6',
          light: '#8E70F0',
        },
        'soft-lavender': {
          DEFAULT: '#C5B4FF',
          light: '#EBE5FF',
          dark: '#A892FF',
        },
        lime: {
          DEFAULT: '#D9F36A',
          hover: '#C8E350',
          dark: '#8DA716',
          light: '#F2FBC8',
        },
        'off-white': {
          DEFAULT: '#F8F6F0',
          dark: '#EDE9DE',
        },
        // Backward-compatible semantic mappings for existing component classes:
        navy: {
          DEFAULT: '#30205C',
          light: '#422D7A',
          dark: '#211542',
        },
        lavender: {
          DEFAULT: '#7655E9',
          light: '#EBE5FF',
          soft: '#C5B4FF',
          dark: '#6342D6',
        },
        yellow: {
          DEFAULT: '#D9F36A',
          dark: '#C8E350',
        },
        cream: {
          DEFAULT: '#F8F6F0',
          dark: '#EDE9DE',
        },
        coral: {
          DEFAULT: '#FF5C5C',
          dark: '#E04848',
        },
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
