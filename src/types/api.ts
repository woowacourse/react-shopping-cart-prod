import { OrderCartItemsData } from '.';
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
  quantity: number;
}

interface PostOrderRequestBody {
  cartItems: OrderCartItemsData[];
}

export type {
  HTTPErrorMessageCode,
  APIErrorMessage,
  PostCartItemRequestBody,
  PatchCartItemRequestBody,
  PostOrderRequestBody,
};
