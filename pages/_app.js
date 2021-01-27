// pages/_app.js
import "../styles/tailwind.css";
import "typeface-open-sans";
import "typeface-merriweather";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const title = pageProps.frontmatter ? pageProps.frontmatter.title : "Code with Alkesh";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
