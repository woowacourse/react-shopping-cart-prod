import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchProductListThunk } from 'store/actions/product.action';
import { productSelector } from 'store/selector';

import useReduxState from 'hooks/useReduxState';

export default function useProductList() {
  const [productState, dispatch] = useReduxState(productSelector);
  const { isLoading, productList, pageCount } = productState;
  const isInitial = useRef(true);

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ?? 1;

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    dispatch(fetchProductListThunk(currentPage));
  }, [currentPage]);

  return { isLoading, productList, pageCount, currentPage };
}
