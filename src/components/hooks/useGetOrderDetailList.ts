import { useState } from 'react';
import { OrderDetailInfo, ServerNameType } from '../../types';
import * as api from '../../api';
import useToast from './useToast';
import { API_ERROR_MESSAGE } from '../../constants';
import { useParams } from 'react-router-dom';

export const useGetOrderDetailList = () => {
  const [orderItem, setOrderItem] = useState<OrderDetailInfo | null>(null);
  const { id: orderId } = useParams();
  const { showToast } = useToast();

  const getOrderDetailThroughApi = (serverName: ServerNameType, loginCredential: string) => {
    if (!orderId) return;

    api
      .getOrderDetail<OrderDetailInfo>(serverName, loginCredential, orderId)
      .then(setOrderItem)
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.getDetailOrder);
          return;
        }

        showToast('error', e.message);
      });
  };

  return { orderItem, getOrderDetailThroughApi };
};
