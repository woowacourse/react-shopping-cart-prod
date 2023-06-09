import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ORDER_URL } from '../constants/url';
import { serverState } from '../recoil';
import { OrderItemDetail } from '../types';
import { useFetchData } from './useFetchData';

export const useGetOrderItemDetail = () => {
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();
  const orderId = useParams().id;

  const [orderItemDetail, setOrderItemDetail] = useState<OrderItemDetail>();

  useEffect(() => {
    api
      .get(`${server}${ORDER_URL}/${orderId}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setOrderItemDetail(data);
      });
  }, [server]);

  return orderItemDetail;
};
