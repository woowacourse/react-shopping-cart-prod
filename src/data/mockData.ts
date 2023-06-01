import { OrderItem, OrderItemDetails } from '../types';

export const orders: OrderItem[] = [
  {
    orderId: 1,
    orderProducts: [
      {
        productId: 24,
        name: '친환경 실링 용기',
        quantity: 3,
        price: 60000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
        totalPrice: 180000,
      },
      {
        productId: 25,
        name: '새로운 친환경 실링 용기',
        quantity: 1,
        price: 50000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
        totalPrice: 50000,
      },
    ],
  },
  {
    orderId: 2,
    orderProducts: [
      {
        productId: 33,
        name: '아이템 2',
        quantity: 3,
        price: 1000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
        totalPrice: 3000,
      },
      {
        productId: 55,
        name: '아이템 5',
        quantity: 2,
        price: 14000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
        totalPrice: 28000,
      },
    ],
  },
];

// ----------------------------------------------------------------

export const orderDetails: OrderItemDetails[] = [
  {
    orderId: 1,
    orderProducts: [
      {
        productId: 33,
        name: '아이템 2',
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
        quantity: 3,
        price: 1000,
        totalPrice: 3000,
      },
      {
        productId: 55,
        name: '아이템 5',
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
        quantity: 2,
        price: 14000,
        totalPrice: 28000,
      },
    ],
    orderTotalPrice: 31000,
    usedPoint: 200,
    createdAt: '2023-05-26 21:00:01',
  },
];
