import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Pagination = ({ count }) => {
  const pageIntoArray = Array.from(Array(count).keys());

  return (
    <nav>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="list-none pagination flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm ">
            {pageIntoArray.map((page) => {
              return (
                <li key={page} className="page-item p-2">
                  <Link href={page === 0 ? '/' : `/page/${page + 1}`}>
                    <a className="text-yellow-500 page-link block hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{page + 1} </a>
                  </Link>
                </li>
              );
            })}
          </ul>
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired
};

export default Pagination;
