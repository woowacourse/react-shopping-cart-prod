import React, { useEffect } from 'react';

import useProductList from 'hooks/useProductList';

import { ErrorContainer } from 'components/common';
import { ProductCard } from 'components/product';

import * as S from 'components/product/ProductList/ProductList.style';
import { ERROR_MESSAGES } from 'constants/messages';
import useReduxState from 'hooks/useReduxState';
import { isLoggedInSelector } from 'store/selector';

function ProductList() {
  const { isLoading, productList, pageCount, currentPage } = useProductList();
  const [isLoggedIn] = useReduxState(isLoggedInSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLoading]);

  return pageCount && currentPage > pageCount ? (
    <ErrorContainer>{ERROR_MESSAGES.INVALID_PAGE}</ErrorContainer>
  ) : (
    <S.Container>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <ProductCard.skeleton key={index} />
          ))
        : productList.map((product) => (
            <ProductCard key={product.id} product={product} isLoggedIn={isLoggedIn} />
          ))}
    </S.Container>
  );
}

export default ProductList;
