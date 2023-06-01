import { atom, selector, selectorFamily, useRecoilValue } from 'recoil';
import { Product } from '../../types/Product';
import { base64 } from '../../constants/user';
import { APIAtom } from '../atoms/serverAtom';

export interface OrderDetail {
  orderId: number;
  orderInfo: Product[];
  originalPrice: number;
  usedPoint: number;
  pointToAdd: number;
}

export const orderDetailSelector = selectorFamily<OrderDetail, number>({
  key: 'orderDetailSelector',
  get: (orderId) => async () => {
    const apiEndPoint = useRecoilValue(APIAtom);

    const getOrderList = await fetch(`${apiEndPoint}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    return await getOrderList.json();
  },
});
