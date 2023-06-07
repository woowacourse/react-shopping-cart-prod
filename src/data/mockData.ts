import { LOCAL_STORAGE_KEY } from '../constants';
import { getLocalStorage } from '../utils/localStorage';
import type { CartItem, Order, OrderDetail, Payments, Product } from '../types';

export const cartItems: CartItem[] = getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []);

export const paymentsData: Payments = {
  originalPrice: 0, // 상품들의 주문 가격

  // 할인 정책, 할인율, 적용시 가격을 담은 객체의 배열
  discounts: [],

  // 정책이 모두 적용된 총 가격
  discountedPrice: 0,
  deliveryFee: 0,

  // 배송비 + 물건 총 가격
  finalPrice: 0,
};
export const nullProducts: Product[] | null = null;

export const products: Product[] | null = [
  {
    id: 1,
    name: '매우 긴 이름 예시용 목 데이터 매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터매우 긴 이름 예시용 목 데이터',
    price: 43400,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
  },
  {
    id: 2,
    name: 'PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
  },
  {
    id: 3,
    name: 'PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/fbe1660a-20f4-4077-8ce7-d8926c7b4e6d.jpg?h=300&w=300',
  },
  {
    id: 4,
    name: 'PET보틀-납작(450ml)',
    price: 39900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/6adcd3f3-25a3-4038-82a4-322eb72ec281.jpg?h=300&w=300',
  },
  {
    id: 5,
    name: 'PET보틀-단지(480ml)',
    price: 41000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/61d13e8f-63fe-4a19-baee-e84a2ae2b922.jpg?h=300&w=300',
  },
  {
    id: 6,
    name: 'PET보틀-납작(260ml)',
    price: 61800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/d07bec18-ce84-41c2-8903-61cbd10712b6.jpg?h=300&w=300',
  },
  {
    id: 7,
    name: 'PET보틀-원형(500ml)',
    price: 70000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
  },
  {
    id: 8,
    name: 'PET보틀-원형(300ml)',
    price: 40400,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/09601088-36bc-484f-ba30-b6cb04eee0b8.jpg?h=300&w=300',
  },
  {
    id: 9,
    name: 'PET보틀-삼각(330ml)',
    price: 65300,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/b51caccc-cd64-479a-a600-a7ce0507085f.jpg?h=300&w=300',
  },
  {
    id: 10,
    name: 'PET보틀-삼각(530ml)',
    price: 10000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/6e1e0dc3-4a10-4729-910a-ff3c837836fe.jpg?h=300&w=300',
  },
  {
    id: 11,
    name: 'PET보틀-원형(600ml)',
    price: 47500,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/03e63566-5d56-4dc0-9357-2caaeaeebf7e.jpg?h=300&w=300',
  },
  {
    id: 12,
    name: 'PET보틀-납작(260ml)',
    price: 64200,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/d07bec18-ce84-41c2-8903-61cbd10712b6.jpg?h=300&w=300',
  },
];

export const orderList: Order[] = getLocalStorage<Order[]>(LOCAL_STORAGE_KEY.ORDER_LIST, []);

export const orderDetail: OrderDetail = {
  id: 3,
  orderTime: '2023-05-26T18:25:43.511Z',
  productList: [
    {
      name: '뽀로로 튼튼한 성장기 어린이 음료 235mL',
      totalPrice: 2550,
      quantity: 3,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrv1JEzSxNjrQgR2VcpDw5wUJV4_RiJEwRb-gn2-Q&s',
    },
    {
      name: '데자와 민트초코 밀크티 ',
      totalPrice: 50000,
      quantity: 4,
      imageUrl:
        'https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2020%2F11%2Ftejava-mint-chocolate-milk-tea-2020-release-info-1.jpg?q=90&w=1400&cbr=1&fit=max',
    },
  ],
  paymentAmount: {
    originalPrice: 52500, // 상품들의 주문 가격

    // 할인 정책, 할인율, 적용시 가격을 담은 객체의 배열
    discounts: [
      {
        discountPolicy: '첫 주문 10% 할인',
        discountAmount: 5250,
      },
    ],

    // 정책이 모두 적용된 총 가격
    discountedPrice: 47250,
    deliveryFee: 3000,

    // 배송비 + 물건 총 가격
    finalPrice: 50250,
  },
};
