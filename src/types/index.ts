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

export interface selectedCouponItemType {
  couponId: number;
  couponName: string;
  minAmount: string;
  isPublished: boolean;
  isSelected: boolean;
}

interface OrderItemType {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface OrderItemListType {
  id: number;
  products: OrderItemType[];
}

export interface BeforeBuyItemType {
  id: number;
  quantity: number;
}

export interface OrderItemInformation {
  orderId: number;
  products: OrderItemType[];
  totalProductAmount: number;
  deliveryAmount: number;
  discountedProductAmount: number;
  address: string;
}
