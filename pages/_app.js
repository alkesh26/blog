// pages/_app.js
import "../styles/tailwind.css";
import "typeface-open-sans";
import "typeface-merriweather";
import Head from "next/head";
import { useRouter } from "next/router";
import { frontmatter } from "./../utils/constants";
import * as gtag from "../lib/gtag";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  if ( !pageProps.frontmatter ) {
    pageProps.frontmatter = {
      title: frontmatter.title,
      description: frontmatter.description,
      categories: frontmatter.categories,
    }
  }

  const router = useRouter();
  const title = pageProps.frontmatter.title;
  const description = pageProps.frontmatter.description;
  const categories = pageProps.frontmatter.categories;
  const basePath = process.env.BASE_PATH;
  const relativePath = router.asPath;
  const fullPath = `${basePath}${relativePath}`;

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={categories} />
        <meta name="author" content="Alkesh Ghorpade" />
        <meta name="robots" content="all"></meta>

        <link rel="canonical" href={fullPath}></link>

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:url" content={fullPath} />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:site_name" content="Alkesh blogs" />

        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@_alkesh26"></meta>
        <meta name="twitter:title" content={title}></meta>
        <meta name="twitter:description" content={description}></meta>
        <meta name="twitter:url" content={fullPath}></meta>
        <meta name="twitter:image" content={`${basePath}/logo.png`}></meta>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
