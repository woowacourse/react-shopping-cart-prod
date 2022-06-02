import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { productCountSelector } from 'store/selector';

import * as S from 'components/common/Pagination/Pagination.style';

function Pagination() {
  const pageCount = useSelector(productCountSelector);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;

  return (
    <S.Container>
      <S.Inner>
        {Array.from({ length: pageCount }).map((_, index) => {
          const pageNumber = index + 1;
          const isCurrent = pageNumber === Number(currentPage);

          return (
            <S.CustomLink key={index} to={`./?page=${pageNumber}`} $isCurrent={isCurrent}>
              <S.Button $isCurrent={isCurrent}>{pageNumber}</S.Button>
            </S.CustomLink>
          );
        })}
      </S.Inner>
    </S.Container>
  );
}

export default Pagination;
