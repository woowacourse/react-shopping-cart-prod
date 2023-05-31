import { useRecoilValue } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';
import { base64 } from '../../constants/user';

export const useOrderFetch = () => {
  const apiEndPoint = useRecoilValue(APIAtom);

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

  return { orderByCartId };
};
