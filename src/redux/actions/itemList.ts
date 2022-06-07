import { generateAsyncActionGroup } from 'redux/utils';

export const ITEM_LIST_ACTION_TYPE = {
  GET_ITEM_LIST: 'items/GET_ITEM_LIST',
};

const getItemList = generateAsyncActionGroup(ITEM_LIST_ACTION_TYPE.GET_ITEM_LIST);

export const itemListAction = {
  getItemList,
};

export type ItemListAction = ReturnType<
  typeof itemListAction[keyof typeof itemListAction][keyof typeof itemListAction[keyof typeof itemListAction]]
>;
