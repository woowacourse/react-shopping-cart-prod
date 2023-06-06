import type { CartItemData } from '../../types/cart';

const mockCartList: CartItemData[] = [
  {
    id: 1684161725526,
    quantity: 7,
    product: {
      id: 1,
      name: '종이용기(1100cc)-단골이 됐으면 좋겠다',
      price: 61100,
      discountRate: 0,
      discountedPrice: 61100,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/cba783a5-b35d-4b9d-b58e-56801594351f.jpg',
    },
  },
  {
    id: 1684161727333,
    quantity: 1,
    product: {
      id: 2,
      name: '올인원 세트-물티수저',
      price: 57600,
      discountRate: 0,
      discountedPrice: 57600,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/dcee7c3b-230f-482b-a549-ee0ee678222e.jpg',
    },
  },
  {
    id: 1684161728982,
    quantity: 1,
    product: {
      id: 3,
      name: '종이용기(900cc)-너무맛있겠다',
      price: 60000,
      discountRate: 5,
      discountedPrice: 57000,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/4ece565d-7fbf-4af4-b4a0-e545c15eda10.jpg',
    },
  },
];

export { mockCartList };
