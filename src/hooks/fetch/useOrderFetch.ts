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
    cartItemId: number[],
    originalPrice: number,
    usedPoint: number,
    pointToAdd: number
  ) => {
    return fetch(`${apiEndPoint}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        order: cartItemId,
        originalPrice: originalPrice,
        usedPoint: usedPoint,
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
