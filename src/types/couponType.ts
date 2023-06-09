export type ServerCouponKind = 'percent' | 'price' | 'delivery';

export interface ServerCouponType {
  id: number;
  name: string;
  type: ServerCouponKind;
  value: number;
  minimumPrice: number;
}

export type CouponKind = 'percent' | 'price' | 'delivery';

export interface CouponType {
  id: number;
  name: string;
  type: CouponKind;
  value: number;
  minimumPrice: number;
}
