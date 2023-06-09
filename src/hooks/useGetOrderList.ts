/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ORDER_URL } from '../constants/url';
import { orderListState, serverState } from '../recoil';
import { useFetchData } from './useFetchData';

export const useGetOrderList = () => {
  const server = useRecoilValue(serverState);
  const { api, isLoading } = useFetchData();
  const [orderList, setOrderList] = useRecoilState(orderListState);

  useEffect(() => {
    api
      .get(`${server}${ORDER_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setOrderList(data);
      });
  }, [server, setOrderList]);

  return { orderList, isLoading };
};
