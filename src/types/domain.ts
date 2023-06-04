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

export interface Coupon {
  id: number | null;
  name: string;
  minOrderPrice: number;
  maxDiscountPrice: number;
  isAvailable: boolean;
  discountPrice: number | null;
  expiredAt: string;
}

export interface Order {
  couponId: Coupon["id"];
  products: Omit<LocalProductType, "id">[];
}

export interface OrderItemList {
  id: number;
  products: Omit<LocalProductType, "cartItemId">[];
}
