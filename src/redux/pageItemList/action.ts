import { ActionGroupType, ActionsType } from 'redux/types';
import { buildThunkActionGroup } from 'redux/utils';
import { Item } from 'types/domain';
import { Valueof } from 'types/utilities';

export const PageItemListActionType = {
  GET_PAGE_ITEM_LIST: 'items/GET_PAGE_ITEM_LIST',
} as const;

const getPageItemListActionGroup = buildThunkActionGroup<
  Item[],
  typeof PageItemListActionType.GET_PAGE_ITEM_LIST
>(PageItemListActionType.GET_PAGE_ITEM_LIST);

export const pageItemListActions = {
  getPageItemListActionGroup,
};

export type PageItemListAction = ActionsType<ActionGroupType<typeof pageItemListActions>>;
