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

export type { ProductItemData, CartItemData, ProductItemPriceData };
