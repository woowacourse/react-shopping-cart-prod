import { CartProduct } from './product';

interface OrderInfo {
  id: number;
  originalPrice: number;
  actualPrice: number;
  deliveryFee: number;
  cartItems: CartProduct[];
}

export default OrderInfo;
