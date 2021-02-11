// pages/_app.js
import "../styles/tailwind.css";
import "typeface-open-sans";
import "typeface-merriweather";
import Head from "next/head";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const title = pageProps.frontmatter.title;
  const description = pageProps.frontmatter.description;
  const categories = pageProps.frontmatter.categories;
  const basePath = process.env.BASE_PATH;
  const relativePath = useRouter().asPath;
  const fullPath = `${basePath}${relativePath}`;

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

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@_alkesh26"></meta>
        <meta name="twitter:title" content={title}></meta>
        <meta name="twitter:description" content={description}></meta>
        <meta name="twitter:url" content={fullPath}></meta>
        <meta name="twitter:image" content={`${basePath}/favicon.ico`}></meta>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
