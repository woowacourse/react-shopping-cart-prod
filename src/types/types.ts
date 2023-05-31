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
  couponName: string;
  discountPercent: number;
  minAmount: number;
}

export type { ProductItem, CartItem, OrderItem, Coupon };
