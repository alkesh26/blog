import Layout from './layout';
import Pagination from './pagination';
import PostList from './postList';
import PropTypes from 'prop-types';
import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';

const Home = ({ posts }) => {
  return (
    <Layout>
      <h1 className="text-2xl text-orange-400 font-semibold">
        <Link href='/'>
          <a className="text-2xl text-orange-400">
            All Blogs
          </a>
        </Link>
      </h1>
      <PostList posts={posts} />
      <Pagination totalPostCount={allPosts.length} />
    </Layout>
  );
};

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default Home;
