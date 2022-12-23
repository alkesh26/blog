import { allPosts } from 'contentlayer/generated';
import { pick } from '@contentlayer/client';
import PropTypes from 'prop-types';
import generateRSS from '../lib/generateRssFeed';
import { BLOGS_PER_PAGE } from './../utils/constants';
import { sortByDate } from './../utils/helpers';
import Home from '../components/home';

export async function getStaticProps() {
  const posts = allPosts.map((post) => pick(post, ['title', 'date', 'slug', 'description', 'categories', 'hashtags']));
  const sortedPosts = sortByDate(posts);
  const postsPerPage = sortedPosts.slice(0, BLOGS_PER_PAGE);
  await generateRSS(sortedPosts);
  return { props: { posts: postsPerPage } };
}

const Main = ({ posts }) => {
  return (
    <>
    <Home posts={posts}/>
    </>
  );
};

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default Main;
