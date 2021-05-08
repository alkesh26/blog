import fs from "fs";
import matter from "gray-matter";
import Layout from "./../components/layout";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <Layout>
      {sortedPosts(posts).map(({ frontmatter: { title, description, date }, slug }) => (
        <article key={title} className="mb-5 border-b border-t-0 border-l-0 border-r-0 border-gray-200 border-solid">
          <header>
            <span className="text-sm text-gray-600">{date}</span>
            <h3 className="mb-2 mt-0">
              <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                <a className="text-xl font-semibold text-yellow-500 no-underline">
                  {title}
                </a>
              </Link>
            </h3>
          </header>
          <section>
            <p>{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}

function sortedPosts(posts) {
  return posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
}

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/content/posts`);

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`content/posts/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetadata);

    // Convert post date to format: Month day, Year
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = data.date.toLocaleDateString("en-US", options);

    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return {
    props: {
      posts
    },
  };
}
