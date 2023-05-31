export type OrderProduct = {
  name: string,
  price: number,
  quantity: number,
  image_url: string,
};

export type Order = {
  orderId: number,
  products: OrderProduct[],
  totalPrice: number,
  usedPoint: number,
  orderedAt: string,
};