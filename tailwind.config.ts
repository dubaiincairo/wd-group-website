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
        brand: {
          dark: "#09090B",
          surface: "#18181B",
          slate: "#27272A",
          accent: "#2563EB",
          accentHover: "#1D4ED8",
          accentLight: "#EFF6FF",
          accentBorder: "#BFDBFE",
          pearl: "#F4F5F8",
          card: "#FFFFFF",
          border: "#E4E4E7",
          subtle: "#FAFAFA",
        },
        sector: {
          hospitality: {
            DEFAULT: "#CA8A04",
            light: "#FEFCE8",
            border: "#FEF08A",
            dark: "#854D0E",
          },
          manufacturing: {
            DEFAULT: "#0891B2",
            light: "#ECFEFF",
            border: "#A5F3FC",
            dark: "#155E75",
          },
          contracting: {
            DEFAULT: "#EA580C",
            light: "#FFF7ED",
            border: "#FED7AA",
            dark: "#9A3412",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-kufi)", "system-ui", "sans-serif"],
        arabic: ["var(--font-noto-kufi)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'pill': '999px',
      },
      boxShadow: {
        'ambient': '0 10px 30px -10px rgba(24, 24, 27, 0.08)',
        'ambient-lg': '0 20px 40px -15px rgba(24, 24, 27, 0.12)',
        'hover-sapphire': '0 20px 40px -15px rgba(37, 99, 235, 0.22)',
        'hover-hospitality': '0 20px 40px -15px rgba(202, 138, 4, 0.20)',
        'hover-manufacturing': '0 20px 40px -15px rgba(8, 145, 178, 0.20)',
        'hover-contracting': '0 20px 40px -15px rgba(234, 88, 12, 0.20)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
