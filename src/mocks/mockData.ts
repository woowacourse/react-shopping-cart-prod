import { CartItemFromRemote, ProductItemType } from 'types/ProductType';

export const productList: ProductItemType[] = [
  {
    id: 1,
    name: '111',
    price: 43400,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/139412ef-c4f5-43e1-959d-a0ec7190b4c5.png?h=300&w=300',
  },
  {
    id: 2,
    name: '222',
    price: 73400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 3,
    name: '333',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 4,
    name: '444',
    price: 10000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 5,
    name: '555',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 6,
    name: '666',
    price: 61800,
    imageUrl: 'http://placekitten.com/200/200',
  },
];

export const cart: CartItemFromRemote[] = [
  {
    id: 1,
    quantity: 5,

    product: {
      id: 1,
      name: '111',
      price: 43400,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/139412ef-c4f5-43e1-959d-a0ec7190b4c5.png?h=300&w=300',
    },
  },
  {
    id: 2,
    quantity: 10,

    product: {
      id: 2,
      name: '222',
      price: 73400,
      imageUrl: 'http://placekitten.com/200/200',
    },
  },
  {
    id: 3,
    quantity: 3,

    product: {
      id: 6,
      name: '666',
      price: 61800,
      imageUrl: 'http://placekitten.com/200/200',
    },
  },
];

export const orderList = [
  {
    id: 1,
    totalItemsPrice: 60000,
    discountPrice: 0,
    deliveryFee: 0,
    orderItems: [
      {
        orderItemId: 1,
        name: '치킨',
        price: 10000,
        imageUrl: 'http://example.com/chicken.jpg',
        quantity: 4,
      },
      {
        orderItemId: 3,
        name: '치킨',
        price: 10000,
        imageUrl: 'http://example.com/chicken.jpg',
        quantity: 2,
      },
    ],
  },
  {
    id: 2,
    totalItemsPrice: 30000,
    discountPrice: 2000,
    deliveryFee: 3000,
    orderItems: [
      {
        orderItemId: 3,
        name: '치킨',
        price: 10000,
        imageUrl: 'http://example.com/chicken.jpg',
        quantity: 2,
      },
      {
        orderItemId: 5,
        name: '치킨',
        price: 10000,
        imageUrl: 'http://example.com/chicken.jpg',
        quantity: 1,
      },
    ],
  },
];

export const couponList = [
  {
    id: 1,
    name: '생일 쿠폰',
    type: 'percent',
    value: 10,
    minimumPrice: 0,
  },
  {
    id: 2,
    name: '40000원 이상 3000원 할인 쿠폰',
    type: 'price',
    value: 3000,
    minimumPrice: 40000,
  },
  {
    id: 3,
    name: '배달비 할인 쿠폰',
    type: 'delivery',
    value: 3000,
    minimumPrice: 0,
  },
];
