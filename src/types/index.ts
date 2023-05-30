interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface OrderProduct {
  name: string;
  totalPrice: number;
  quantity: number;
  imageUrl: string;
}

interface DiscountPolicy {
  discountPolicy: string;
  discountAmount: number;
}

interface PaymentsData {
  originalPrice: number; // 상품들의 주문 가격

  // 할인 정책, 할인율, 적용시 가격을 담은 객체의 배열
  discounts: DiscountPolicy[];

  // 정책이 모두 적용된 총 가격
  discountedPrice: number;
  deliveryFee: number;

  // 배송비 + 물건 총 가격
  finalPrice: number;
}

interface ToastState {
  type: 'success' | 'error' | 'warning';
  message: string;
}

type MutationFetchMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type { Product, CartItem, OrderProduct, DiscountPolicy, ToastState, MutationFetchMethod, PaymentsData };
