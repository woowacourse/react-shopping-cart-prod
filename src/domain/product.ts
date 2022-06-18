export interface ProductType {
  id: number;
  imageURL: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartType {
  id: number;
  quantity: number;
}
