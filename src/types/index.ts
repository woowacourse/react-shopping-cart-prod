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

interface Order {
  id: number;
  orderTime: string;
  productList: OrderProduct[];
}

interface OrderProduct extends Pick<Product, 'name' | 'imageUrl'> {
  totalPrice: number;
  quantity: number;
}

interface Payments {
  originalPrice: number; // 상품들의 주문 가격

  // 할인 정책, 할인율, 적용시 가격을 담은 객체의 배열
  discounts: Discount[];

  // 정책이 모두 적용된 총 가격
  discountedPrice: number;
  deliveryFee: number;

  // 배송비 + 물건 총 가격
  finalPrice: number;
}

interface Discount {
  discountPolicy: string;
  discountAmount: number;
}

interface OrderDetail extends Order {
  paymentAmount: Payments;
}

interface ToastState {
  type: 'success' | 'error' | 'warning';
  message: string;
}

type MutationFetchMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type { Product, CartItem, ToastState, Payments, OrderDetail, Order, MutationFetchMethod };
