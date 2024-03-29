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
      lineHeight: {
        base: "2",
      },

      // Set the base font size for the document.
      fontSize: {
        base: ["18px", "2"],
      },

      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      height: {
        rem22: "22rem",

        rem26: "26rem",
        rem28: "28rem",
        rem30: "30rem",
        dialog: "32rem",
        rem33: "33rem",
        rem34: "34rem",

        carousel: "38rem",
        rem50: "99rem",
      },
      width: {
        carousel: "50rem",
        textArea: "66rem",
        blog: "30rem",
      },
      fontFamily: {
        mainFont: ["IranSans"],
        SultanFont: ["SultanFont"],
      },
    },
    daisyui: {
      styled: false,
      base: false,
    },
    screens: {
      xs: { max: "767px" },
      sm: { min: "768px", max: "991px" },
      md: { min: "768px", max: "1199px" },
      lg: { min: "1200px" },
    },
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      mainPurple: "#1f1f1f",
      darkPurple: "#383838",
      mainBlue: "#ebc000",
      mainYellow: "#dea004",
      // mainBlue: "#1982C4",
      mainWhite: "#FFF1E1",
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
