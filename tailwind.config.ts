import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F1B3D",
          light: "#1E3A6E",
          50: "#E8EDF5",
          100: "#C5D0E6",
          200: "#9BAFD4",
          300: "#7190C2",
          400: "#4A71B0",
          500: "#1E3A6E",
          600: "#0F1B3D",
        },
        accent: {
          DEFAULT: "#10B981",
          light: "#34D399",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
