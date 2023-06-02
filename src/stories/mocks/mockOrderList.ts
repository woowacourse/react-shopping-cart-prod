import { OrderData } from '../../types/order';

const mockOrderList: OrderData[] = [
  {
    id: 1685433648003,
    orderedItems: [
      {
        id: 3,
        quantity: 3,
        price: 60000,
        discountRate: 5,
        discountedPrice: 57000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/list/4ece565d-7fbf-4af4-b4a0-e545c15eda10.jpg?h=400&w=400',
        name: '종이용기(900cc)-너무맛있겠다',
      },
      {
        id: 2,
        name: '올인원 세트-물티수저',
        quantity: 29,
        price: 57600,
        discountRate: 0,
        discountedPrice: 57600,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/list/dcee7c3b-230f-482b-a549-ee0ee678222e.jpg?h=400&w=400',
      },
    ],
    orderedAt: new Date(),
    totalItemDiscountAmount: 90000,
    totalMemberDiscountAmount: 501120,
    totalItemPrice: 1850400,
    discountedTotalItemPrice: 1340280,
    shippingFee: 0,
    totalPrice: 1340280,
  },
];

export { mockOrderList };
