import { atom, selector } from 'recoil';

import { OrderData } from '../types';

export const orderListState = atom({
  key: 'orderListState',
  default: selector<OrderData[]>({
    key: 'orderListState/default',
    get: ({ get }) => {
      // 사용자별 주문 전체 목록 get

      return [
        {
          id: 1123124124,
          orderedItems: [
            {
              quantity: 1,
              product: {
                id: 1,
                name: '종이용기(1100cc)-단골이 됐으면 좋겠다',
                price: 60000,
                discountRate: 10,
                discountedPrice: 54000,
                imageUrl:
                  'https://cdn-mart.baemin.com/sellergoods/list/cba783a5-b35d-4b9d-b58e-56801594351f.jpg?h=400&w=400',
              },
            },
          ],
          orderedAt: '2023:03:44',
          totalItemPrice: 60000,
          discountedTotalItemPrice: 54000,
          shippingFee: 3000,
          totalPrice: 57000,
        },
        {
          id: 988923784,
          orderedItems: [
            {
              quantity: 1,
              product: {
                id: 1,
                name: '종이용기(1100cc)-단골이 됐으면 좋겠다',
                price: 60000,
                discountRate: 10,
                discountedPrice: 54000,
                imageUrl:
                  'https://cdn-mart.baemin.com/sellergoods/list/cba783a5-b35d-4b9d-b58e-56801594351f.jpg?h=400&w=400',
              },
            },
            {
              quantity: 1,
              product: {
                id: 1,
                name: '종이용기(1100cc)-단골이 됐으면 좋겠다',
                price: 60000,
                discountRate: 10,
                discountedPrice: 54000,
                imageUrl:
                  'https://cdn-mart.baemin.com/sellergoods/list/cba783a5-b35d-4b9d-b58e-56801594351f.jpg?h=400&w=400',
              },
            },
          ],
          orderedAt: '2023:03:44',
          totalItemPrice: 60000,
          discountedTotalItemPrice: 54000,
          shippingFee: 3000,
          totalPrice: 57000,
        },
      ];
    },
  }),
});
