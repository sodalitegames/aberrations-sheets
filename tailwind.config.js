const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#020605',
        light: colors.neutral,
        dark: {
          DEFAULT: '#000000',
          50: '#0A0A0A',
          75: '#0D0D0D',
          100: '#0F0F0F',
          150: '#121212',
          200: '#171717',
          250: '#1A1A1A',
          300: '#1C1C1C',
          350: '#1F1F1F',
          400: '#242424',
          450: '#212121',
          500: '#262626',
        },
        primary: { DEFAULT: '#164650', dark: '#123840', light: '#1A5460', fade: '#1F6370', deep: '#0D2A30' },
        secondary: { DEFAULT: '#001D3D', dark: '#001429', light: '#002952', fade: '#003366', deep: '#000A14' },
        tertiary: { DEFAULT: '#3E1324', dark: '#2E0E1B', light: '#4E182E', fade: '#5E1537', deep: '#1E0912' },
        accent1: { DEFAULT: '#92D7DE', dark: '#43B9C7', deep: '#21686E' },
        accent2: { DEFAULT: '#BEA0CF', dark: '#8F5CAD', deep: '#4E305F' },
        accent3: { DEFAULT: '#E9DC86', dark: '#D9C330', deep: '#796C16' },
        util: { red: '#C44939', green: '#4FB286' },
        green: colors.emerald,
        yellow: colors.amber,
        gray: colors.zinc,
        teal: colors.teal,
      },
      fontFamily: {
        sans: ['Kanit', ...defaultTheme.fontFamily.sans],
        alt: ['Prompt', ...defaultTheme.fontFamily.sans],
        display: ['Audiowide', 'Kanit', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};

// FONT OPTIONS
// font-family: 'Audiowide', cursive;
// font-family: 'Kanit', sans-serif;
// font-family: 'Prompt', sans-serif;
