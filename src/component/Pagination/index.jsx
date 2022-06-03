import React from 'react';
import PropTypes from 'prop-types';

import PaginationStyled from './style';

function Pagination({totalNumber, limit, pagePosition, setPagePosition}) {
  const pagesNumber = Math.ceil(totalNumber / limit);

  const handleClickButton = (event) => {
    const clickedPageNumber = Number(event.target.innerText);
    setPagePosition(clickedPageNumber);
  };

  const handlePrevButton = () => {
    setPagePosition(pagePosition - 1);
  };

  const handleNextButton = () => {
    setPagePosition(pagePosition + 1);
  };

  return (
    <PaginationStyled>
      <button className="control-button" onClick={handlePrevButton} disabled={pagePosition === 1}>
        ᐸ
      </button>
      {Array.from({length: pagesNumber}, (value, idx) => {
        const pageNumber = idx + 1;

        return (
          <button
            key={idx}
            onClick={handleClickButton}
            className={pageNumber === pagePosition ? 'active' : ''}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className="control-button"
        onClick={handleNextButton}
        disabled={pagePosition === pagesNumber}
      >
        ᐳ
      </button>
    </PaginationStyled>
  );
}

Pagination.propTypes = {
  totalNumber: PropTypes.number,
  limit: PropTypes.number,
  pagePosition: PropTypes.number,
  setPagePosition: PropTypes.func,
};

export default Pagination;
