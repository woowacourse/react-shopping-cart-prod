import styled from 'styled-components';

import OrderProductItem from './OrderProductItem';

const OrderProductList = () => {
  const orderListExample = [
    {
      orderId: 1,
      orderDateTime: '2023-05-24 08:30:21',
      orderItems: [
        // 최대 2개
        {
          quantity: 5,
          product: {
            productId: 1,
            price: 10000,
            name: '치킨',
            imageUrl: 'http://example.com/chicken.jpg',
            stock: 12,
          },
        },
        {
          quantity: 1,
          product: {
            productId: 2,
            price: 20000,
            name: '피자',
            imageUrl: 'http://example.com/pizza.jpg',
            stock: 11,
          },
        },
      ],
      totalPrice: 40500, // 총 주문 금액
    },
    {
      orderId: 2,
      orderDateTime: '2023-05-24 08:30:21',
      orderItems: [
        {
          quantity: 5,
          product: {
            productId: 1,
            price: 10000,
            name: '치킨',
            imageUrl: 'http://example.com/chicken.jpg',
            stock: 12,
          },
        },
        {
          quantity: 1,
          product: {
            productId: 2,
            price: 20000,
            name: '피자',
            imageUrl: 'http://example.com/pizza.jpg',
            stock: 6,
          },
        },
      ],
      totalPrice: 40500,
    },
  ];

  return (
    <div>
      {orderListExample[0].orderItems.map((item) => (
        <OrderProductItem orderProduct={item} />
      ))}
    </div>
  );
};

export default OrderProductList;
