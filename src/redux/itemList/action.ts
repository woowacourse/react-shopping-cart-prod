import { ActionGroupType, ActionsType } from 'redux/types';
import { buildThunkActionGroup } from 'redux/utils';
import { Item } from 'types/domain';
import { Valueof } from 'types/utilities';

export const ItemListActionType = {
  GET_ITEM_LIST: 'items/GET_ITEM_LIST',
  GET_ITEM_LIST_START: 'items/GET_ITEM_LIST_START',
  GET_ITEM_LIST_SUCCESS: 'items/GET_ITEM_LIST_SUCCESS',
  GET_ITEM_LIST_FAILURE: 'items/GET_ITEM_LIST_FAILURE',
} as const;

const getItemListActionGroup = buildThunkActionGroup<
  Item[],
  typeof ItemListActionType.GET_ITEM_LIST
>(ItemListActionType.GET_ITEM_LIST);

export const itemListActions = {
  getItemListActionGroup,
};

export type ItemListAction = ActionsType<ActionGroupType<typeof itemListActions>>;
