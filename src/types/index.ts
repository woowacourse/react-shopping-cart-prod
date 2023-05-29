interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface Order {
  id: number;
  orderTime: string;
  productList: OrderProduct[];
}

interface OrderProduct extends Pick<Product, 'name' | 'imageUrl'> {
  totalPrice: number;
  quantity: number;
}

interface ToastState {
  type: 'success' | 'error' | 'warning';
  message: string;
}

type MutationFetchMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type { Product, CartItem, ToastState, Order, MutationFetchMethod };
