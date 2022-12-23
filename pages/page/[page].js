import PropTypes from 'prop-types';
import { allPosts } from 'contentlayer/generated';
import { pick } from '@contentlayer/client';
import { sortByDate, pageCount } from '../../utils/helpers';
import { BLOGS_PER_PAGE } from '../../utils/constants';
import Home from '../../components/home';

export async function getStaticPaths() {
  const totalPostCount = allPosts.length;
  const pageIntoArray = Array.from(Array(totalPostCount).keys());
  const paths = [];

  pageIntoArray.map(
    path => paths.push({
      params: { page: `${path + 1}` }
    })
  );
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const posts = allPosts.map((post) => pick(post, ['title', 'date', 'slug', 'description', 'categories', 'hashtags']));
  const postsSortByDate = sortByDate(posts);
  const totalPostCount = pageCount(allPosts.length);
  let postsPerPage;

  if ((params)) {
    if (Number(params.page) === 1) {
      postsPerPage = postsSortByDate.slice(0, BLOGS_PER_PAGE);
    }
    if (Number(params.page) === 2) {
      postsPerPage = postsSortByDate.slice(BLOGS_PER_PAGE, BLOGS_PER_PAGE * params.page);
    }
    if (Number(params.page) > 2) {
      postsPerPage = postsSortByDate.slice(BLOGS_PER_PAGE * params.page - BLOGS_PER_PAGE, BLOGS_PER_PAGE * params.page);
    }
  } else {
    postsPerPage = postsSortByDate.slice(0, BLOGS_PER_PAGE);
  }

  return {
    props: {
      posts: postsPerPage,
      totalPostCount
    }
  };
}

const Page = ({ posts, totalPostCount }) => {
  return (
    <Home posts={posts} totalPostCount={totalPostCount} />
  );
};

Page.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  totalPostCount: PropTypes.number
};

export default Page;
