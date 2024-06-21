import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      vanilla: '#FBE8A6',
      orange: '#F4976C',
      darkBlue: '#303C6C',
      lightBlue: '#B4DFE5',
      white: '#D2FDFF',
      primary: '#303C6C',
      secondary: '#F4976C',
      tertiary: '#B4DFE5',
      primaryBg: '#FBE8A6'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
