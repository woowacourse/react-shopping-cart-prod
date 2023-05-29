interface ProductItemData {
  id: number;
  name: string;
  price: number;
  discountRate: number;
  discountedPrice: number;
  imageUrl: string;
}

type ProductItemPriceData = Pick<ProductItemData, 'price' | 'discountRate' | 'discountedPrice'>;

export type { ProductItemData, ProductItemPriceData };
