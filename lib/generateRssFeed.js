import fs from "fs";
import { Feed } from "feed";
import { frontmatter } from "../utils/constants";

export default async function generateRssFeed(posts) {
  const siteURL = process.env.BASE_PATH;
  const date = new Date();
  const author = {
    name: "Alkesh Ghorpade",
    email: "alkesh26@gmail.com",
    link: "https://twitter.com/_alkesh26",
  };

  const feed = new Feed({
    title: frontmatter.title,
    description: frontmatter.description,
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Alkesh Ghorpade`,
    updated: date,
    generator: "Feed for blog",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/post/${post.slug}`;
    const frontmatter = post.frontmatter;
    feed.addItem({
      title: frontmatter.title,
      id: url,
      link: url,
      description: frontmatter.description,
      content: frontmatter.content,
      author: [author],
      contributor: [author],
      date: new Date(frontmatter.date),
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
}
