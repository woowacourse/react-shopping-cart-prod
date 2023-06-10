import { DEDUCTION, PERCENTAGE } from '../abstract/constants';
import { servers } from '../service/apiURL';

/**
 *  상품 타입(id, name, price, imageUrl)
 */
export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

/**
 * 카트 아이템타입(id, quantity, product(상품타입))
 */
export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}

/**
 * 쿠폰 타입(id, name, discountType, discountRate, discountAmount, minimumPrice, maximumPrice)
 */
export interface CouponType {
  id: number;
  name: string;
  discountType: DiscountAmount;
  discountRate: number;
  discountAmount: number;
  minimumPrice: number;
}

/**
 * 쿠폰 타입에 발행가능 여부 속성 추가
 */
export interface IssuableCouponType extends CouponType {
  issuable: boolean;
}

/**
 * 주문된 상품 타입(quantity, product(상품타입))
 */
export interface OrderProductsType {
  quantity: number;
  product: ProductType;
}

/**
 * 주문목록 타입(id, orderProducts(주문된 상품 타입), confirmState(주문확정상태))
 */
export interface OrderListType {
  id: number;
  orderProducts: OrderProductsType[];
  confirmState: boolean;
}

/**
 * 주문목록을 확장한 주문 상세 타입(originalPrice,discountPrice,coupon))
 */
export interface OrderDetailType extends OrderListType {
  originalPrice: number;
  discountPrice: number;
  coupon: CouponType;
}

/**
 * 쿠폰 타입(퍼센트 / 금액)
 */
export type DiscountAmount = typeof PERCENTAGE | typeof DEDUCTION;

export type ServerURLType = (typeof servers)[keyof typeof servers];
