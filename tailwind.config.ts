import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        "nav-bar-tab": "0.125rem 0.125rem 0.125rem 0.125rem",
        "nav-bar-left": "2rem 0.125rem 0.125rem 2rem",
      },
      fontFamily: {
        "playfair-display": ["Playfair Display", "serif"],
        "poetsen-one": ["Poetsen One", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addBase, theme }: any) {
      const extractColorVars = (
        colorObj: Record<string, string | Record<string, string>>,
        colorGroup = ""
      ): Record<string, string> => {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable =
            colorKey === "DEFAULT"
              ? `--color${colorGroup}`
              : `--color${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === "string"
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {} as Record<string, string>);
      };

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
export default config;
