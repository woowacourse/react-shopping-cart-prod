interface CartItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  isSelected: boolean;
}

interface CartState {
  items: CartItem[];
}

interface ProductType {
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
