import { Item } from 'types/domain';

export enum ItemListActionType {
  GET_ITEM_LIST_START = 'items/GET_ITEMLIST_START',
  GET_ITEM_LIST_SUCCESS = 'items/GET_ITEMLIST_SUCCESS',
  GET_ITEM_LIST_FAILURE = 'items/GET_ITEMLIST_FAILURE',

  GET_ITEM_START = 'items/GET_ITEM_START',
  GET_ITEM_SUCCESS = 'items/GET_ITEM_SUCCESS',
  GET_ITEM_FAILURE = 'items/GET_ITEM_FAILURE',
}

interface GetItemListActionStart {
  type: ItemListActionType.GET_ITEM_LIST_START;
}

interface GetItemListActionSuccess {
  type: ItemListActionType.GET_ITEM_LIST_SUCCESS;
  payload: Item[];
}

interface GetItemListActionFailure {
  type: ItemListActionType.GET_ITEM_LIST_FAILURE;
  payload: string;
}

export type ItemListAction =
  | GetItemListActionStart
  | GetItemListActionSuccess
  | GetItemListActionFailure;
