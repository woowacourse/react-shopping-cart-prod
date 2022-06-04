// @ts-nocheck
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ProductItem } from 'components';

import store from 'store/store';
import { doInitializeProductList } from 'actions/actionCreator';

import Styled from 'page/ProductListPage/index.style';
import { authApiClient } from 'utils/apiClient';
// import { SERVER_URL } from 'utils/constants';

const ProductListPage = () => {
  const { products } = useSelector(state => state.reducer);

  const getProducts = useCallback(async () => {
    if (products.length > 0) return;

    const response = await authApiClient.get(`${process.env.REACT_APP_PRODUCT_API_URL}/products`);

    store.dispatch(doInitializeProductList({ products: response.data }));
  }, [products]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Styled.ProductListPage>
      {products.length > 0 ? (
        <Styled.ProductList>
          {products.map(({ id, name, price, image }) => {
            return id && <ProductItem key={id} id={id} name={name} price={price} image={image} />;
          })}
        </Styled.ProductList>
      ) : (
        <Styled.Loading>열심히 로딩중 .. ✨</Styled.Loading>
      )}
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
