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
          dark: "#08090C",
          darker: "#040507",
          surface: "#0F1117",
          card: "#141721",
          cardHover: "#1A1E2C",
          slate: "#252B3B",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.18)",
          muted: "#94A3B8",
          accent: "#2563EB",
          accentHover: "#1D4ED8",
          accentLight: "rgba(37, 99, 235, 0.15)",
          accentBorder: "rgba(37, 99, 235, 0.35)",
        },
        sector: {
          hospitality: "#1A476A",
          hospitalityGlow: "#38BDF8",
          manufacturing: "#0B5C3D",
          manufacturingGlow: "#34D399",
          contracting: "#8A7340",
          contractingGlow: "#FBBF24",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-kufi)", "system-ui", "-apple-system", "sans-serif"],
        arabic: ["var(--font-noto-kufi)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.15)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        'aurora-reverse': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-40px, 40px) scale(1.1)' },
          '66%': { transform: 'translate(30px, -30px) scale(0.9)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'aurora': 'aurora 14s ease-in-out infinite alternate',
        'aurora-slow': 'aurora 20s ease-in-out infinite alternate',
        'aurora-reverse': 'aurora-reverse 16s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
      boxShadow: {
        'glow-blue': '0 0 40px -10px rgba(37, 99, 235, 0.35)',
        'glow-emerald': '0 0 40px -10px rgba(11, 92, 61, 0.35)',
        'glow-gold': '0 0 40px -10px rgba(138, 115, 64, 0.35)',
        'glow-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(37, 99, 235, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
