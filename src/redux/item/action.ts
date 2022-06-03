import { ActionGroupType, ActionsType } from 'redux/types';
import { buildThunkActionGroup } from 'redux/utils';
import { Item } from 'types/domain';
import { Valueof } from 'types/utilities';

export const ItemActionType = {
  GET_ITEM: 'item/GET_ITEM',
} as const;

const getItemActionGroup = buildThunkActionGroup<Item, typeof ItemActionType.GET_ITEM>(
  ItemActionType.GET_ITEM
);

export const itemActions = {
  getItemActionGroup,
};

export type ItemAction = ActionsType<ActionGroupType<typeof itemActions>>;
