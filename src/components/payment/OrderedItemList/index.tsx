import React, { useState } from 'react';
import OrderedItem from '../OrderedItem';
import * as S from './OrderedItemList.styles';
import { Order } from 'types/api/orders';

const initialList: Order[] = [
  {
    id: 1,
    orderedTime: '2023-05-28 21:20:20.316874',
    orderedItems: [
      {
        id: 1,
        quantity: 3,
        name: '치킨',
        totalPrice: 7000,
        totalDiscountPrice: 2000,
        imageUrl:
          'https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73ff604e7b0e6900f9ac53a43965300eb9a',
      },
      {
        id: 2,
        quantity: 3,
        name: '샐러드',
        totalPrice: 16000,
        totalDiscountPrice: 2000,
        imageUrl:
          'https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73ff604e7b0e6900f9ac53a43965300eb9a',
      },
      {
        id: 3,
        quantity: 3,
        name: '피자',
        totalPrice: 9700,
        totalDiscountPrice: 2000,
        imageUrl:
          'https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73ff604e7b0e6900f9ac53a43965300eb9a',
      },
    ],
  },
];

const OrderedItemList = () => {
  const [orderList, setOrderList] = useState<Order[]>(initialList);

  return (
    <S.ItemWrapper>
      {orderList.map((item) => (
        <OrderedItem order={item} />
      ))}
    </S.ItemWrapper>
  );
};

export default OrderedItemList;
