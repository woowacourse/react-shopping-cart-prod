export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface LocalProductType extends ProductType {
  cartItemId: number;
  quantity: number;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}
