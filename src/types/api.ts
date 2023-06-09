import type { HTTP_ERROR_MESSAGE } from '../constants/api';
import type { CartItemData } from './cart';
import type { OrderCartItemsData } from './order';
import type { ProductItemData } from './product';

type HTTPErrorMessageCode = keyof typeof HTTP_ERROR_MESSAGE;

type APIErrorCode = 400 | 500;

type APIErrorMessage = {
  [key in APIErrorCode]: string;
};

interface PostCartItemRequestBody {
  productId: ProductItemData['id'];
}

interface PatchCartItemRequestBody {
  quantity: CartItemData['quantity'];
}

type PostOrderRequestBody = OrderCartItemsData;

export type {
  HTTPErrorMessageCode,
  APIErrorMessage,
  PostCartItemRequestBody,
  PatchCartItemRequestBody,
  PostOrderRequestBody,
};
