export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}

export interface LocalProductType extends ProductType {
  quantity: number;
  cartItemId: number;
}

export interface CouponType {
  id: number;
  name: string;
  minOrderPrice: number;
}

export interface MyCouponType extends CouponType {
  maxDiscountPrice: number;
  isAvailable: boolean;
  discountPrice: number;
  expiredAt: Date;
}

export interface MemberType {
  id: number;
  nickname: string;
}

export interface OrderType {
  id: number;
  products: Omit<LocalProductType, "cartItemId">[];
}

export interface OrderDetailType extends OrderType {
  totalProductPrice?: number;
}

export interface ToastType {
  type: "success" | "error";
  isShown: boolean;
  message: string;
}
