type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type Item = {
  product: Product;
  quantity: number;
};

export type OrderResponse = {
  orderId: number;
  items: Item[];
  productPrice: number;
  discountPrice: number;
  deliveryFee: number;
  totalPrice: number;
};

type Order = {
  orderId: number;
  items: Item[];
  productPrice: number;
  discountPrice: number;
  deliveryFee: number;
  totalPrice: number;
};

export type OrdersResponse = {
  orders: Order[];
};
