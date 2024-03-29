/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  i18n,
};
const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'", "boutak.com"],
              scriptSrc: ["'self'", "'unsafe-inline'"],
            },
          },
          xssProtection: true,
          forceHTTPSRedirect: [
            true,
            { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true },
          ],
          referrerPolicy: "same-origin",
        }),
      },
    ];
  },
};
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Use the browser version of the sharp library
      config.resolve.alias["sharp"] = "sharp/browser";
    }

    return config;
  },
};

module.exports = nextConfig;
