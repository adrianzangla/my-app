import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'palette-1': '#07485e',
        'palette-2': '#b3d8f4',
        'palette-3': '#8cbcff',
        'palette-4': '#7c84e8',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
