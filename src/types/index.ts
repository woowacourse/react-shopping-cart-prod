export interface ProductItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductItemType;
  isChecked: boolean;
}

export interface CouponItemType {
  couponId: number;
  couponName: string;
  minAmount: string;
  isPublished: boolean;
}

export interface OrderItemType {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
}

export interface OrderItemListType {
  id: number;
  products: OrderItemType[];
}

export interface OrderItemInformation {
  id: number;
  products: OrderItemType[];
  total_amount: number;
  delivery_amount: number;
  discounted_amount: number;
  address: string;
}
