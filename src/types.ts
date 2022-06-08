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

export type { ProductType, ProductState };
