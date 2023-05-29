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
  selected: boolean;
  discount: {
    type: "rate" | "price";
    amount: number;
  };
}

export interface Order {
  product: Product;
  quantity: number;
  couponId: number[];
}

interface OrderItem extends Order {
  orderItemId: number;
  total: number;
}

export interface EachOrderStatement {
  orderId: 1;
  orderItems: OrderItem[];
}
