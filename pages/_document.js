import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { createGetInitialProps } from "@mantine/next";
const getInitialProps = createGetInitialProps();
export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
            integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
            crossorigin=""
          />{" "}
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
            integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
          />
        </body>
      </Html>
    );
  }
}
