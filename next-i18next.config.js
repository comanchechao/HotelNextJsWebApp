const path = require("path");

module.exports = {
  i18n: {
    locales: ["fa", "tr"],
    defaultLocale: "fa",
    localePath: path.resolve("./public/static/locales"),
  },
};
