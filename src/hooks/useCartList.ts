/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, checkedItemsState } from '../store/CartState';
import { serverState } from '../store/ServerState';
import { useCart } from './useCart';
import useGet from './useGet';
import { CartItem, Product } from '../types';
import { CART_BASE_URL, PRODUCT_BASE_URL } from '../constants/url';
import { useEffect } from 'react';
import { totalPriceSelector } from '../store/CartSelector';
import pointState from '../store/PointState';
import useOrder from './useOrder';
import { DELIVERY_FEE } from '../constants';
import { productListState } from '../store/ProductListState';

const useCartList = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const setProduct = useSetRecoilState(productListState);
  const serverUrl = useRecoilValue(serverState);
  const { initializeCheckItems } = useCart();
  const { data: fetchedCartList, isLoading } = useGet<CartItem[]>(`${serverUrl}${CART_BASE_URL}`);
  const { data: fetchedProductList } = useGet<Product[]>(`${serverUrl}${PRODUCT_BASE_URL}`);

  const checkedItems = useRecoilValue(checkedItemsState);
  const totalPrice = useRecoilValue(totalPriceSelector(checkedItems));
  const usedPoint = useRecoilValue(pointState);
  const { handleOrderItems } = useOrder();

  useEffect(() => {
    if (fetchedCartList) setCart(fetchedCartList);
    if (fetchedProductList) setProduct(fetchedProductList);
    initializeCheckItems();
  }, [serverUrl, fetchedProductList]);

  const handleOrder = () => {
    handleOrderItems(checkedItems, usedPoint, DELIVERY_FEE(totalPrice));
  };

  return {
    cart,
    serverUrl,
    checkedItems,
    isLoading,
    totalPrice,
    usedPoint,
    handleOrder,
  };
};

export default useCartList;
