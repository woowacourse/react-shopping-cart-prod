/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CartList from '../components/cart/CartList';
import { CartListWrapper } from '../style/ContentLayout';
import { cartState } from '../store/CartState';
import { productListState } from '../store/ProductListState';
import { serverState } from '../store/ServerState';
import useGet from '../hooks/useGet';
import { CartItem, Product } from '../types';
import { CART_BASE_URL, PRODUCT_BASE_URL } from '../constants/url';
import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const setProduct = useSetRecoilState(productListState);
  const serverUrl = useRecoilValue(serverState);
  const { initializeCheckItems } = useCart();

  const { data: fetchedCartList, isLoading } = useGet<CartItem[]>(`${serverUrl}${CART_BASE_URL}`);
  const { data: fetchedProductList } = useGet<Product[]>(`${serverUrl}${PRODUCT_BASE_URL}`);

  useEffect(() => {
    if (fetchedCartList) setCart(fetchedCartList);
    if (fetchedProductList) setProduct(fetchedProductList);
    initializeCheckItems();
  }, [serverUrl, fetchedProductList]);

  return (
    <CartListWrapper>
      <CartList cart={cart} isLoading={isLoading} />
    </CartListWrapper>
  );
};

export default CartPage;
