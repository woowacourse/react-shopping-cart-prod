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

export type { ProductItemData, CartItemData, PostCartItemRequestBody };
