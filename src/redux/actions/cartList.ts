import { CartItem } from 'types/domain';

export enum CartListActionType {
  GET_CART_LIST_START = 'cart/GET_CART_LIST_START',
  GET_CART_LIST_SUCCESS = 'cart/GET_CART_LIST_SUCCESS',
  GET_CART_LIST_FAILURE = 'cart/GET_CART_LIST_FAILURE',

  PATCH_CART_ITEM_START = 'cart/PATCH_CART_ITEM_START',
  PATCH_CART_ITEM_SUCCESS = 'cart/PATCH_CART_ITEM_SUCCESS',
  PATCH_CART_ITEM_FAILURE = 'cart/PATCH_CART_ITEM_FAILURE',

  POST_CART_ITEM_START = 'cart/POST_CART_ITEM_START',
  POST_CART_ITEM_SUCCESS = 'cart/POST_CART_ITEM_SUCCESS',
  POST_CART_ITEM_FAILURE = 'cart/POST_CART_ITEM_FAILURE',

  REMOVE_CART_ITEM_START = 'cart/REMOVE_CART_ITEM_START',
  REMOVE_CART_ITEM_SUCCESS = 'cart/REMOVE_CART_ITEM_SUCCESS',
  REMOVE_CART_ITEM_FAILURE = 'cart/REMOVE_CART_ITEM_FALIURE',
}

interface GetCartListStart {
  type: CartListActionType.GET_CART_LIST_START;
}

interface GetCartListSuccess {
  type: CartListActionType.GET_CART_LIST_SUCCESS;
  payload: CartItem[];
}

interface GetCartListFailure {
  type: CartListActionType.GET_CART_LIST_FAILURE;
  payload: string;
}

interface PatchCartItemStart {
  type: CartListActionType.PATCH_CART_ITEM_START;
}

interface PatchCartItemSuccess {
  type: CartListActionType.PATCH_CART_ITEM_SUCCESS;
  payload: { cartItems: CartItem[] };
}

interface PatchCartItemFailure {
  type: CartListActionType.PATCH_CART_ITEM_FAILURE;
  payload: string;
}

interface PostCartItemStart {
  type: CartListActionType.POST_CART_ITEM_START;
}

interface PostCartItemSuccess {
  type: CartListActionType.POST_CART_ITEM_SUCCESS;
  payload: CartItem;
}

interface PostCartItemFailure {
  type: CartListActionType.POST_CART_ITEM_FAILURE;
  payload: string;
}

interface RemoveCartItemStart {
  type: CartListActionType.REMOVE_CART_ITEM_START;
}

interface RemoveCartItemSuccess {
  type: CartListActionType.REMOVE_CART_ITEM_SUCCESS;
  payload: any;
}

interface RemoveCartItemFailure {
  type: CartListActionType.REMOVE_CART_ITEM_FAILURE;
  payload: string;
}

export type CartListAction =
  | GetCartListStart
  | GetCartListSuccess
  | GetCartListFailure
  | PatchCartItemStart
  | PatchCartItemSuccess
  | PatchCartItemFailure
  | PostCartItemStart
  | PostCartItemSuccess
  | PostCartItemFailure
  | RemoveCartItemStart
  | RemoveCartItemSuccess
  | RemoveCartItemFailure;
