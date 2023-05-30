import React, { useState } from 'react';
import OrderedItem from '../OrderedItem';
import { Order } from 'types';
import * as S from './OrderedItemList.styles';

const initialList: Order[] = [
  {
    orderId: 1,
    orderedTime: '2023-05-28 21:20:20.316874',
    products: [
      {
        product_id: 1,
        product_name: '치킨',
        product_price: 7000,
        product_imageUrl:
          'https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73ff604e7b0e6900f9ac53a43965300eb9a',
      },
      {
        product_id: 2,
        product_name: '샐러드',
        product_price: 16000,
        product_imageUrl:
          'https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73ff604e7b0e6900f9ac53a43965300eb9a',
      },
      {
        product_id: 3,
        product_name: '피자',
        product_price: 9700,
        product_imageUrl:
          'https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73ff604e7b0e6900f9ac53a43965300eb9a',
      },
    ],
    deliveryPrice: {
      price: 0,
    },
    coupons: [
      {
        couponId: 1,
        couponName: '전체 10% 할인 쿠폰',
      },
      {
        couponId: 2,
        couponName: '전체 2000원 할인 쿠폰',
      },
      {
        couponId: 3,
        couponName: 'DELIVERY_FREE',
      },
    ],
  },
];

const OrderedItemList = () => {
  const [paymentItems, setPaymentItems] = useState<Order[]>(initialList);
  return (
    <S.ItemWrapper>
      {paymentItems.map((item) => (
        <OrderedItem item={item} />
      ))}
    </S.ItemWrapper>
  );
};

export default OrderedItemList;
