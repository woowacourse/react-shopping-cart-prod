export type OrderProduct = {
  name: string,
  price: number,
  quantity: number,
  image_url: string,
};

export type Order = {
  order_id: number,
  products: OrderProduct[],
  total_price: number,
  used_point: number,
  ordered_at: string,
};