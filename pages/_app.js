import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "../styles/transition.css";
import Transitions from "../components/Transitions";
import store from "../store/index";
import { useState } from "react";
import { Provider } from "react-redux";
function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <>
      <Head>
        <title>رزرو هتل راحت تر از همیشه با استفاده از سامانه رزرو بوتک</title>
        <meta
          name="description"
          content="
با بوتک رزرو هتل آسان و سریع است! بوتک، هتل و استراحتگاه های رفاهی فوق العاده را با بهترین قیمت ها و نرخ های ویژه ارائه می دهد. با ما بهترین قیمت و محل هتل خود را پیدا کنید. این سایت به شما انواع امکانات، عرضه های ویژه و کد های تخفیف اختصاصی را برای استفاده از برترین هتل ها، با مناسب ترین قیمت ها فراهم میکند"
        />
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
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Transitions>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </Transitions>
        </SessionContextProvider>
      </MantineProvider>
    </>
  );
}

export default appWithTranslation(App);
