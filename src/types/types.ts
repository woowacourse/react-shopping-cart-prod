interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItemResponses {
  cartItems: CartItem[];
  totalPrice: number;
}

interface CartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

interface Order {
  orderId: number;
  orderItems: OrderItem[];
  usedCoupons: Coupon[];
  usedPoint: number;
  paymentPrice: number;
  createAt: string;
}

interface OrdersResponses {
  orderResponses: Order[];
}

interface OrderRequest {
  orderItems: [
    {
      cartItemId: number;
      productId: number;
      quantity: number;
    }
  ];
  orderDiscounts: {
    couponIds: number[];
    point: number;
  };
}

interface OrderItem {
  id: number;
  productName: string;
  productPrice: number;
  productQuantity: number;
  imageUrl: string;
}

interface Coupon {
  id: number;
  couponName: string;
  discountPercent: number;
  discountAmount: number;
  minAmount: number;
}

interface PointHistory {
  orderId: number;
  earnedPoint: number;
  usedPoint: number;
}

interface Point {
  pointHistories: PointHistory[];
  totalPoint: number;
}

interface Member {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type {
  ProductItem,
  CartItemResponses,
  CartItem,
  Order,
  OrdersResponses,
  OrderRequest,
  OrderItem,
  Coupon,
  Point,
  Member,
};
