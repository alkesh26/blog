import Layout from "./layout";
import Pagination from './pagination';
import PostList from './postList';
import PropTypes from 'prop-types';

const Home = ({ posts, totalPostCount }) => {
  return (
    <Layout>
      <h1 className="text-2xl text-yellow-500 font-semibold">All blogs</h1>
      <PostList posts={posts} />
      <Pagination count={totalPostCount} />
    </Layout>
  );
}

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  totalPostCount: PropTypes.number
}

export default Home;