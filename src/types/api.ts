import { CartItemData, CartPriceData } from '.';
import { HTTP_ERROR_MESSAGE } from '../constants/api';

type HTTPErrorMessageCode = keyof typeof HTTP_ERROR_MESSAGE;

type APIErrorCode = 400 | 500;

type APIErrorMessage = {
  [key in APIErrorCode]: string;
};

interface PostCartItemRequestBody {
  productId: number;
}

interface PatchCartItemRequestBody {
  productId: number;
  quantity: number;
}

interface PostOrdersRequestBody extends CartPriceData {
  cartItemIds: CartItemData['id'][];
}

export type {
  HTTPErrorMessageCode,
  APIErrorMessage,
  PostCartItemRequestBody,
  PatchCartItemRequestBody,
  PostOrdersRequestBody,
};
