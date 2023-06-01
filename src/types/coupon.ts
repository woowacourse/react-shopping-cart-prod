type CouponType = 'percent';

interface CouponInfo {
  id: number;
  type: CouponType;
  amount: number;
  name: string;
}

export default CouponInfo;
