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
  discountAmount: number;
  isChecked: boolean;
}
