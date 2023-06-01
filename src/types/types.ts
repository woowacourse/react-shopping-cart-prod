interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
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
  paymentPrice: number;
  createdAt: string;
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

export type { ProductItem, CartItem, Order, OrdersResponses, OrderRequest, OrderItem, Coupon };
