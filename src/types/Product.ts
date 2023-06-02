export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;
  pointRatio?: number;
  pointAvailable?: boolean;
}
