import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { originState } from '../store/origin';
import productListState from '../store/product';

const useProducts = () => {
  const [, setProductItem] = useRecoilState(productListState);
  const origin = useRecoilValue(originState);

  const fetchProductList = useCallback(async () => {
    const response = await fetch(`${origin}/products`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    setProductItem(result);
    return result;
  }, [origin, setProductItem]);

  return { fetchProductList };
};

export default useProducts;
