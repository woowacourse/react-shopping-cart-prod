// @ts-nocheck
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ProductItem } from 'components';
import Styled from './index.style';

import { doInitializeCartList, doInitializeProductList } from 'reducers/cart.reducer';
import apiClient from 'apis/apiClient';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.cartReducer);
  // TODO  1. get 상품 목록 가져오기
  const getProducts = useCallback(async () => {
    if (products.length > 0) return; // 서버에서 상품 목록 갱신될 수 있으므로 매번 상품 목록 가져오는 것이 적절할 것으로 생각됨. 따라서 이 라인의 코드는 삭제 검토 필요

    const response = await apiClient.get('/products');
    console.log(response.data);
    dispatch(doInitializeProductList({ products: response.data }));
  }, [dispatch, products.length]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // TODO 3. get 장바구니 목록 가져오기
  const getCart = useCallback(async () => {
    const response = await apiClient.get('/cart');
    console.log('장바구니', response.data);
    dispatch(doInitializeCartList({ shoppingCart: response.data }));
  }, [dispatch]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <Styled.ProductListPage>
      {products.length > 0 ? (
        <Styled.ProductList>
          {products.map(({ productId, name, price, image }) => {
            return (
              productId && (
                <ProductItem
                  key={productId}
                  productId={productId}
                  name={name}
                  price={price}
                  image={image}
                />
              )
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
