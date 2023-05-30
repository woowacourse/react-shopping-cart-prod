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
  orderId: number;
  items: Cart[];
  productPrice: number;
  discountPrice: number;
  deliveryFee: number;
  totalPrice: number;
};
