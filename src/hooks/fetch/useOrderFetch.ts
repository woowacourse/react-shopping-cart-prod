import { useRecoilValue } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';
import { base64 } from '../../constants/user';

export const useOrderFetch = () => {
  const apiEndPoint = useRecoilValue(APIAtom);

  const getOrder = async () => {
    const getOrderList = await fetch(`${apiEndPoint}/orders`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    if (getOrderList) return getOrderList.json();
  };

  const getPoint = async () => {
    const getPoint = await fetch(`${apiEndPoint}/point`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    if (getPoint) return getPoint.json();
  };

  const orderByCartId = (
    cartItemIds: number[],
    originalPrice: number,
    usedPoint: number,
    pointToAdd: number
  ) => {
    return fetch(`${apiEndPoint}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        cartItemIds: cartItemIds,
        originalPrice: originalPrice,
        usedPoint: usedPoint ?? 0,
        pointToAdd: pointToAdd,
      }),
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return { getOrder, getPoint, orderByCartId };
};
