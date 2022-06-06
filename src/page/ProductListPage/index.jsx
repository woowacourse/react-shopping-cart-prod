import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {PRODUCT_LIST} from 'store/modules/productList';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';
import Item from 'component/Item';
import * as S from 'page/ProductListPage/style';
import Empty from 'assets/empty.png';

import useCartItem from 'hook/useCartItem';
import useFetch from 'hook/useFetch';
import {PAGINATION_LIMIT} from 'constant';
import Pagination from 'component/Pagination';

export default function ProductListPage() {
  const [pagePosition, setPagePosition] = useState(1);

  const productStartIndex = (pagePosition - 1) * PAGINATION_LIMIT;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productListReducer.productList);

  const {pending: productPending, error: productError, fetch: fetchProduct} = useFetch('get');

  const {initializeCart} = useCartItem();

  useEffect(() => {
    fetchProduct({
      API_URL: process.env.REACT_APP_PRODUCT_API_URL,
      onSuccess: (fetchedData) => {
        dispatch({type: PRODUCT_LIST.INITIALIZE, payload: fetchedData});
      },
    });
  }, [dispatch, fetchProduct]);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  return (
    <S.ProductListPageLayout>
      <ErrorPendingBoundary
        fallback={<img src={Empty} alt="비어있음" height="600px" />}
        pending={productPending}
        error={productError}
      >
        <S.ProductSection>
          <S.ProductListBox>
            {productList &&
              productList
                .slice(productStartIndex, productStartIndex + PAGINATION_LIMIT)
                .map((productInfo) => <Item productInfo={productInfo} key={productInfo.id} />)}
          </S.ProductListBox>
          {productList && (
            <Pagination
              totalNumber={productList.length}
              limit={PAGINATION_LIMIT}
              pagePosition={pagePosition}
              setPagePosition={setPagePosition}
            />
          )}
        </S.ProductSection>
      </ErrorPendingBoundary>
    </S.ProductListPageLayout>
  );
}
