import { RANK } from '../constants/member';

interface ProductItemData {
  id: number;
  name: string;
  price: number;
  discountRate: number;
  discountedPrice: number;
  imageUrl: string;
}

type ProductItemPriceData = Pick<ProductItemData, 'price' | 'discountRate' | 'discountedPrice'>;

interface CartItemData {
  id: number;
  quantity: number;
  product: ProductItemData;
}

interface OrderCartItemsData {
  cartItemId: number;
  quantity: number;
}

interface OrderedItemData {
  quantity: number;
  product: ProductItemData;
}

interface OrderData {
  id: number;
  orderedItems: OrderedItemData[];
  createdAt: Date;
  totalPrice: number;
  discountedTotalPrice: number;
}

interface Member {
  username: string;
  password: string;
}

type MemberRank = (typeof RANK)[number];

interface MemberInformation {
  id: number;
  rank: MemberRank;
  discountRate: number;
}

export type {
  ProductItemData,
  ProductItemPriceData,
  CartItemData,
  OrderCartItemsData,
  OrderedItemData,
  OrderData,
  Member,
  MemberRank,
  MemberInformation,
};
