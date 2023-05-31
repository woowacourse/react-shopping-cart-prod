interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ReceivedCartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

interface CartItem extends ReceivedCartItem {
  checked: boolean;
}

interface NewCartItem extends CartItem {
  quantity: 1;
  checked: true;
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

export type { ProductItem, ReceivedCartItem, CartItem, NewCartItem, OrderItem, Coupon };
