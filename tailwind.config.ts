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
      colors: {
        theme: {
          black: "var(--theme-black)",
          "black-1": "var(--theme-black-1)",
          "black-2": "var(--theme-black-2)",
          "black-light": "var(--theme-black-light)",
          gray: "var(--theme-gray)",
          white: "var(--theme-white)",
          green: "var(--theme-green)",
          red: "var(--theme-red)",
          yellow: "var(--theme-yellow)",
          blue: "var(--theme-blue)",
          purple: "var(--theme-purple)",

          "white/10": "var(--theme-white-10)",
          "white/20": "var(--theme-white-20)",
          "white/50": "var(--theme-white-50)",

          "black-light/50": "var(--theme-black-light-50)",
          "black-light/80:": "var(--theme-black-light-80)",

          "gray/50": "var(--theme-gray-50)",
        },
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
