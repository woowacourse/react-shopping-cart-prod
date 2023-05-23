export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartProduct = {
  quantity: number;
  product: Product;
};

export type CartProducts = Map<number, CartProduct>;

export type CheckedCartProducts = Set<Product['id']>;
