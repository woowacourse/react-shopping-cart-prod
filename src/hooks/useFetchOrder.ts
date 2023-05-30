import { useRecoilValue } from 'recoil';
import { baseURLSelector } from '../store/server';
import { AUTH } from '../constants/auth';
import { FetchMethod } from '../types/global';

type OrderItem = { id: number; quantity: number };

const useFetchOrder = () => {
  const baseURL = useRecoilValue(baseURLSelector);

  const handleOrders = async (method: FetchMethod, body: {}, id?: number) => {
    const response = await fetch(
      `${baseURL}/cart-items/order${id ? `/${id}` : ''}`,
      {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Basic ${AUTH}`,
        },
      }
    );

    if (!response.ok) throw new Error(`error code : ${response.status}`);

    const data = await response.text();
    if (!data) return null;
    return JSON.parse(data);
  };

  const postOrders = async (orderItems: OrderItem[]) => {
    await handleOrders('POST', { orderItems });
  };

  return { postOrders };
};

export default useFetchOrder;
