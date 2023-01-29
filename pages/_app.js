import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import "../styles/transition.css";
import Transition from "../components/Transition";
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>وبسایت رزرو هتل بوتک</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Transition>
          <Component {...pageProps} />
        </Transition>
      </MantineProvider>
    </>
  );
}

export default appWithTranslation(App);
