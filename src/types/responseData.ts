export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type Cart = {
  id: number;
  quantity: number;
  product: Product;
};

export type Order = {
  order_id: number;
  items: Cart[];
  product_price: number;
  discount_price: number;
  delivery_fee: number;
  total_price: number;
};
