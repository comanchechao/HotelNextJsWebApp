/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  plugins: [require("daisyui")],
  content: [
    "./renderer/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      height: {
        rem26: "26rem",
        dialog: "32rem",
        rem33: "33rem",
        rem34: "34rem",

        carousel: "38rem",
      },
      width: {
        carousel: "50rem",
      },
      fontFamily: {
        mainFont: ["IranSans"],
        SultanFont: ["SultanFont"],
      },
      fontSize: {
        "10xl": "14rem",
      },
    },

    screens: {
      xs: { max: "767px" },
      sm: { min: "768px", max: "991px" },
      md: { min: "992px", max: "1199px" },
      lg: { min: "1200px" },
    },
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      mainPurple: "#6930c3",
      mainBlue: "#00FFD1",
      mainYellow: "#ffd500",
      // mainBlue: "#1982C4",
      mainWhite: "#dfc69c",
      mainCream: "#FFE3CB",
      // darkPurple: "#240046",
      goldie: "#ff9e00",
      white: colors.white,
      black: colors.black,
      gray: colors.neutral,
      LightBlue: colors.sky,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.yellow,
      blueGray: colors.slate,
      Lime: colors.lime,
      CoolGray: colors.gray,
      Fuchsia: colors.fuchsia,
      purple: colors.purple,
      green: colors.green,
      pink: colors.pink,
      Rose: colors.rose,
      Indigo: colors.indigo,
      Amber: colors.amber,
      Cyan: colors.cyan,
      Emerald: colors.emerald,
      Sky: colors.sky,
    },
  },

  variants: {
    extend: {},
  },
  // plugins: [require("daisyui")],
};
