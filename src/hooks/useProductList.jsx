import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { fetchProductListAsync } from 'store/actions/product.action';
import { productSelector } from 'store/selector';
import useReduxState from './useReduxState';

export default function useProductList() {
  const [productState, dispatch] = useReduxState(productSelector);
  const { isLoading, productList, pageCount } = productState;

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ?? 1;

  useEffect(() => {
    dispatch(fetchProductListAsync(currentPage));
  }, [currentPage]);

  return { isLoading, productList, pageCount, currentPage };
}
