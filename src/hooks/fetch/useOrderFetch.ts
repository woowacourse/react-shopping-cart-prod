import { useRecoilValue } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';
import { base64 } from '../../constants/user';

export const useOrderFetch = () => {
  const apiEndPoint = useRecoilValue(APIAtom);

  const getOrder = async () => {
    const getOrderList = await fetch('/orders', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    return getOrderList.json();
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
        order: cartItemIds,
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

  return { getOrder, orderByCartId };
};
