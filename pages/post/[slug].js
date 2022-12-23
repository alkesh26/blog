import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown/with-html';
import { allPosts } from 'contentlayer/generated';
import Layout from './../../components/layout';
import SocialMediaShare from './../../components/socialMediaShare';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import PropTypes from 'prop-types';

export async function getStaticPaths() {
  const postsWithSlug = allPosts.map((post) => ({ params: { slug: post.slug } }));
  return { paths: postsWithSlug, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMetadata = fs
    .readFileSync(path.join('content/posts', slug + '.md'))
    .toString();

  const { data, content } = matter(markdownWithMetadata);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = data.date.toLocaleDateString('en-US', options);

  const frontmatter = {
    ...data,
    date: formattedDate
  };

  return { props: { content: `# ${data.title}\n${content}`, frontmatter } };
}
const Post = ({ content, frontmatter }) => {
  return (
    <Layout>
      <article>
        <ReactMarkdown escapeHtml={false} source={content} renderers={{ code: CodeBlock }} />
      </article>
      <SocialMediaShare frontmatter={frontmatter} />
    </Layout>
  );
};

const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
};

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string
};

Post.propTypes = {
  content: PropTypes.string,
  frontmatter: PropTypes.object
};

export default Post;
