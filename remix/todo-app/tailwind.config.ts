import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vanilla: "#FBE8A6",
        orange: "#F4976C",
        darkBlue: "#303C6C",
        lightBlue: "#B4DFE5",
        white: "#D2FDFF",
        red: {
          500: "#EF4444",
        },
        yellow: {
          500: "#F59E0B",
        },
        grey: {
          400: "#A3BDC1",
          // 500: '#778485',
          500: "#6B7280",
        },
        primary: {
          400: "#3F4F8D",
          500: "#303C6C",
        },
        secondary: {
          500: "#F4976C",
          600: "#F17941",
        },
        tertiary: "#B4DFE5",
        primaryBg: "#FBE8A6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
