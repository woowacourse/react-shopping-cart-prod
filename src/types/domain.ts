export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartProduct {
  id: number;
  quantity: number;
  isChecked: boolean;
  product: Product;
  couponId?: number;
}

export interface Coupon {
  couponId: number;
  name: string;
  isSelected: boolean;
  discount: {
    type: "rate" | "price";
    amount: number;
  };
}

export interface EssentialOrderItem {
  product: Product;
  quantity: number;
  coupons: Coupon[];
}

export interface OrderItem extends EssentialOrderItem {
  id: number;
}

export interface Order {
  deliveryFee: number;
  orderItems: OrderItem[];
}

export interface OrderResult extends EssentialOrderItem {
  orderItemId: number;
  total: number;
}

export interface OrderResultStatement {
  orderId: 1;
  deliveryFee: number;
  total: number;
  orderItems: OrderResult[];
}
