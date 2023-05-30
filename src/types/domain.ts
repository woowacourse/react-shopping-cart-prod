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
  minPrice: number;
  isAvailable: boolean;
  discountPrice: number;
}

// common

export interface ToastType {
  type: "success" | "error";
  isShown: boolean;
  message: string;
}
