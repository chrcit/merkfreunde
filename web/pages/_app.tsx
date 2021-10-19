import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { LazyMotion, domAnimation } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Merk-Freunde by MKT München Ost"
        defaultTitle="Merk-Freunde by MKT München Ost"
        openGraph={{
          type: "website",
          locale: "de_de",
          url: "https://www.merk-freunde.de",
          site_name: "Merk-Freunde by MKT München Ost",
          description:
            "Strukturiert und konzentriert erfolgreich durch die Schule. Unser Angebot umfasst das Marburger Konzentrationstraining, Rechtschreibtraining, Hausaufgabenbetreuung und Lerncoaching.",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      ></DefaultSeo>
      <LazyMotion features={domAnimation} strict>
        <Component {...pageProps} />
      </LazyMotion>
    </>
  );
}
export default MyApp;
