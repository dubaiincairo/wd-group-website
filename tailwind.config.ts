import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Untitled UI Neutral Gray Scale
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
          950: "#0C111D",
        },
        // Untitled UI Brand Blue / Tech Sapphire Scale
        brand: {
          25: "#F5FAFF",
          50: "#EFF8FF",
          100: "#D1E9FF",
          200: "#B2DDFF",
          300: "#84CAFF",
          400: "#53B1FD",
          500: "#2E90FA",
          600: "#1570EF",
          700: "#175CD3",
          800: "#1849A9",
          900: "#194185",
          950: "#102A56",
        },
        // Approved Sector Theme Colors
        sector: {
          hospitality: {
            DEFAULT: "#1A476A",
            50: "#F0F5FA",
            100: "#DDE9F2",
            200: "#B8D2E4",
            600: "#1A476A",
            700: "#143753",
          },
          manufacturing: {
            DEFAULT: "#0B5C3D",
            50: "#EDF8F3",
            100: "#D6F0E4",
            200: "#A8DFC6",
            600: "#0B5C3D",
            700: "#084830",
          },
          contracting: {
            DEFAULT: "#8A7340",
            50: "#FAF7F2",
            100: "#F3EEE2",
            200: "#E5DAC1",
            600: "#8A7340",
            700: "#6E5B32",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-kufi)", "system-ui", "-apple-system", "sans-serif"],
        arabic: ["var(--font-noto-kufi)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
        'pill': '9999px',
      },
      boxShadow: {
        'xs': '0px 1px 2px rgba(16, 24, 40, 0.05)',
        'sm': '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
        'md': '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
        'lg': '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
        'xl': '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
        '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
        'focused-brand': '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #D1E9FF',
      },
      transitionTimingFunction: {
        'untitled': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
