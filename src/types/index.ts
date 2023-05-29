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
  orderedAt: string;
  totalItemPrice: number;
  discountedTotalItemPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export type { ProductItemData, CartItemData, PostCartItemRequestBody, OrderedItem, OrderData };
