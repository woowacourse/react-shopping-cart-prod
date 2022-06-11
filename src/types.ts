interface CartItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  isSelected: boolean;
}

interface CartState {
  loading: boolean;
  error: Error | null;
  items: CartItem[];
}

interface ProductType {
  cartId: number | null;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

interface ProductState {
  loading: boolean;
  error: Error | null;
  productList: ProductType[];
}

export type { CartItem, CartState, ProductType, ProductState };
