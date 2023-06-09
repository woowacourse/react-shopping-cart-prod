import { useRecoilValue } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';
import { base64 } from '../../constants/user';
import { selectedCartItemsSelector } from '../../recoil/selectors/cartItemsSelector';

interface OrderRequestBody {
  cartItemIds: number[];
  originalPrice: number;
  usedPoint: number;
  pointToAdd: number;
}

export const useOrderFetch = () => {
  const apiEndPoint = useRecoilValue(APIAtom);
  const selectedCartItems = useRecoilValue(selectedCartItemsSelector);

  const getOrderBody = (usingPoint: number): OrderRequestBody => {
    return {
      cartItemIds: selectedCartItems.map((cartItem) => cartItem.id),
      originalPrice: selectedCartItems.reduce((acc, curr) => {
        return (acc += curr.product.price * curr.quantity);
      }, 0),
      usedPoint: usingPoint ?? 0,
      pointToAdd: selectedCartItems.reduce((acc, curr) => {
        const earnedPoint =
          (curr.product.price * curr.quantity * curr.product.pointRatio) / 100;
        return (acc += earnedPoint);
      }, 0),
    };
  };

  const order = (usingPoint: number) => {
    return fetch(`${apiEndPoint}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getOrderBody(usingPoint)),
    });
  };

  const getUserPoint = async () => {
    return fetch(`${apiEndPoint}/point`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    }).then((res) => res.json());
  };

  const getOrderDetail = async (orderId: number) => {
    return fetch(`${apiEndPoint}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    }).then((res) => res.json());
  };

  const getOrders = async () => {
    return fetch(`${apiEndPoint}/orders`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    }).then((res) => res.json());
  };

  return { order, getUserPoint, getOrderDetail, getOrders };
};
