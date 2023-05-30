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

export interface Order {
  product: Product;
  quantity: number;
  couponIds: number[];
}

export interface OrderResult extends Order {
  orderItemId: number;
  total: number;
}

export interface EachOrderStatement {
  orderId: 1;
  orderItems: OrderResult[];
}
