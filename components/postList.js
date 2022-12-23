import Link from 'next/link';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { DATE_FORMAT } from '../utils/constants';

const PostList = ({ posts }) => {
  return (
    <>
      {(posts).map(({ title, description, date, slug }) => (
        <article key={title} className="mb-5 border-b border-t-0 border-l-0 border-r-0 border-gray-200 border-solid">
          <header>
            <span className="text-sm text-gray-600">{format(parseISO(date), DATE_FORMAT)}</span>
            <h3 className="mb-2 mt-0">
              <Link href={'/post/[slug]'} as={`/post/${slug}`}>
                <a className="text-xl font-semibold text-orange-400 no-underline">
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
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.array
};

export default PostList;
