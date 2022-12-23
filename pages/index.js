import { allPosts } from "contentlayer/generated";
import { pick } from "@contentlayer/client";
import PropTypes from 'prop-types';
import generateRSS from "../lib/generateRssFeed";
import { BLOGS_PER_PAGE } from './../utils/constants';
import { sortByDate, pageCount } from './../utils/helpers';
import Home from '../components/home';

export async function getStaticProps() {
  const posts = allPosts.map((post) => pick(post, ["title", "date", "slug", "description", "categories", "hashtags"]));
  const sortedPosts = sortByDate(posts);
  const totalPostCount = pageCount(allPosts.length);
  const postsPerPage = sortedPosts.slice(0, BLOGS_PER_PAGE);
  await generateRSS(sortedPosts);
  return { props: { posts: postsPerPage, totalPostCount } };
}

const Main = ({ posts, totalPostCount }) => {
  return (
    <>
    <Home posts={posts} totalPostCount={totalPostCount} />
    </>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  totalPostCount: PropTypes.number
}

export default Main;
