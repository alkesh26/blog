import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { pageCount } from './../utils/helpers';
import { useState } from 'react';

const Pagination = ({ totalPostCount }) => {
  const router = useRouter();
  const { query } = router;
  const pageNo = Number(!isEmpty(query) && query.page ? query.page : 1);
  const [currentPageNumber, setCurrentPageNumber] = useState(pageNo);
  const maxPageCount = pageCount(totalPostCount);

  const calculatePrevious = () => {
    return currentPageNumber !== 1 ? currentPageNumber - 1 : 1;
  };

  const calculateNext = () => {
    return currentPageNumber !== maxPageCount ? currentPageNumber + 1 : currentPageNumber;
  };

  const handleClick = (e, type) => {
    e.preventDefault();
    const pageNo = type === 'previous' ? calculatePrevious() : calculateNext();
    setCurrentPageNumber(pageNo);
    router.push(`/page/${pageNo}`);
  };

  const isPreviousButtonDisabled = () => {
    return currentPageNumber === 1;
  };

  const isNextButtonDisabled = () => {
    return currentPageNumber === maxPageCount;
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-orange-400 dark:text-orange-400 px-1">
        Showing
        <span className="font-semibold text-orange-400 text-orange-400 px-1">{currentPageNumber}</span>
        of
        <span className="font-semibold text-orange-400 text-orange-400 px-1">{maxPageCount}</span>
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button disabled={isPreviousButtonDisabled()} onClick={(e) => handleClick(e, 'previous')} aria-label="previous blog"
          className="inline-flex items-center px-4 mx-2 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:text-gray-400 cursor-pointer dark:hover:text-orange-400 dark:hover:text-orange-400 disabled:opacity-80 disabled:cursor-no-drop">
          <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
          Prev
        </button>
        <button disabled={isNextButtonDisabled()} onClick={(e) => handleClick(e, 'next')} aria-label="next blog"
          className="inline-flex items-center px-4 mx-2 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:text-gray-400 cursor-pointer dark:hover:text-orange-400 dark:hover:text-orange-400 disabled:opacity-80 disabled:cursor-no-drop">
          Next
          <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalPostCount: PropTypes.number.isRequired
};

export default Pagination;
