export interface CouponRemote {
  id: number;
  name: string;
  type: 'percent' | 'price' | 'delivery';
  value: number;
  minimumPrice: number;
}

export interface CouponType extends CouponRemote {
  checked: boolean;
}
