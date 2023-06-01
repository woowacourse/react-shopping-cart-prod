interface ProductItemData {
  id: number;
  name: string;
  price: number;
  discountRate: number;
  discountedPrice: number;
  imageUrl: string;
}

interface CartItemData {
  id: number;
  quantity: number;
  product: ProductItemData;
}

interface PostCartItemRequestBody {
  productId: number;
}

interface OrderedItem {
  quantity: number;
  product: ProductItemData;
}

interface OrderData {
  id: number;
  orderedItems: OrderedItem[];
  orderedAt: Date;
  totalItemDiscountAmount: number;
  totalMemberDiscountAmount: number;
  totalItemPrice: number;
  discountedTotalItemPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export const RANK = {
  normal: '일반',
  silver: '실버',
  gold: '골드',
  platinum: '플래티넘',
  diamond: '다이아몬드',
} as const;

export const DISCOUNT_RATE = {
  [RANK.normal]: 0,
  [RANK.silver]: 5,
  [RANK.gold]: 10,
  [RANK.platinum]: 15,
  [RANK.diamond]: 20,
} as const;

export type RANK_VALUE = (typeof RANK)[keyof typeof RANK];

export type RANK_DISCOUNT_RATE = (typeof DISCOUNT_RATE)[keyof typeof DISCOUNT_RATE];

export interface Member {
  id: string;
  rank: RANK_VALUE;
  discountRate: RANK_DISCOUNT_RATE;
}

export type { ProductItemData, CartItemData, PostCartItemRequestBody, OrderedItem, OrderData };
