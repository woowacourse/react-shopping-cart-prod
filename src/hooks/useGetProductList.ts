/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CART_URL, PRODUCT_LIST_URL } from '../constants/url';
import { cartState, productListState, serverState } from '../recoil';
import { useFetchData } from './useFetchData';

export const useGetProductList = () => {
  const [productList, setProductList] = useRecoilState(productListState);
  const server = useRecoilValue(serverState);
  const setCart = useSetRecoilState(cartState);

  const { api, isLoading } = useFetchData();

  useEffect(() => {
    api.get(`${server}${PRODUCT_LIST_URL}`).then((data) => {
      setProductList(data);
    });

    api
      .get(`${server}${CART_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setCart(data);
      });
  }, [server]);

  return { isLoading, productList };
};
