// @ts-nocheck
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ProductItem } from 'components';
import Styled from './index.style';

import { doInitializeCartList } from 'reducers/cart.reducer';
import apiClient from 'apis/apiClient';
import useGetProductsAPI from 'hooks/useGetProductsAPI';

const ProductListPage = () => {
  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  const dispatch = useDispatch();
  const { getProducts, products, isLoading } = useGetProductsAPI();

  // TODO 3. get 장바구니 목록 가져오기
  const getCart = useCallback(async () => {
    const response = await apiClient.get('/cart');
    dispatch(doInitializeCartList({ shoppingCart: response.data }));
  }, [dispatch]);

  return (
    <Styled.ProductListPage>
      {!isLoading ? (
        <Styled.ProductList>
          {products.map(({ id, name, price, image }) => {
            return (
              id && <ProductItem key={id} productId={id} name={name} price={price} image={image} />
            );
          })}
        </Styled.ProductList>
      ) : (
        <Styled.Loading>열심히 로딩중 .. ✨</Styled.Loading>
      )}
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
