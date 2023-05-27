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

interface MemberInformation {
  id: number;
  rank: string;
  discountRate: number;
}

export type {
  ProductItemData,
  ProductItemPriceData,
  CartItemData,
  OrderCartItemsData,
  OrderedItemData,
  OrderData,
  MemberInformation,
};
