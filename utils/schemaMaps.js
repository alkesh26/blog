export function authorDetails() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Alkesh Ghorpade",
      "givenName": "Alkesh",
      "familyName": "Ghorpade",
      "email": "alkesh26@gmail.com",
      "jobTitle": "Staff Software Engineer",
      "sameAs": [
        "https://twitter.com/_alkesh26",
        "https://github.com/alkesh26",
        "https://www.linkedin.com/in/alkesh-ghorpade",
        "https://medium.com/@alkesh26",
        "http://alkeshghorpade.me"
      ],
      "worksFor": "ShakaCode"
    }`
  }
}

export function blogPostDetails(pageProps) {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "url": "${pageProps.url}",
      "name": "${pageProps.frontmatter.title}",
      "headline": "${pageProps.frontmatter.title}",
      "keywords": "${pageProps.frontmatter.hashtags ? pageProps.frontmatter.hashtags.join(", ") : ""}",
      "description": "${pageProps.frontmatter.description}",
      "articleBody": "${pageProps.content}",
      "datePublished": "${pageProps.frontmatter.date}",
      "dateModified": "${pageProps.frontmatter.date}",
      "author": {
        "@type": "Person",
        "name": "Alkesh Ghorpade",
        "givenName": "Alkesh",
        "familyName": "Ghorpade",
        "email": "alkesh26@gmail.com",
        "jobTitle": "Staff Software Engineer",
        "sameAs": [
          "https://twitter.com/_alkesh26",
          "https://github.com/alkesh26",
          "https://www.linkedin.com/in/alkesh-ghorpade",
          "https://medium.com/@alkesh26",
          "http://alkeshghorpade.me"
        ],
        "worksFor": "ShakaCode"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${pageProps.url}"
      }
    }`
  }
}
