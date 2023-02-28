const locales = {
  en: {
    domain: "https://boutak.vercel.app/",
  },
  tr: {
    domain: "https://boutak.vercel.app/tr",
  },
};

module.exports = {
  i18n: {
    locales: locales,
    defaultLocale: "fa",
    domains: [
      {
        domain: "https://boutak.vercel.app/",
        defaultLocale: "fa",
      },
    ],
  },
};
