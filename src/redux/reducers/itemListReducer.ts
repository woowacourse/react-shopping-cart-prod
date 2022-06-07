import { AsyncStatus, createReducer } from 'redux/utils';
import { Item } from 'types/domain';
import { ITEM_LIST_ACTION_TYPE, ItemListAction } from '../actions/itemList';

export interface ItemListState {
  loading: boolean;
  error: string | null;
  data: Item[];
}

export const initialState: ItemListState = {
  loading: false,
  error: null,
  data: [],
};

const getItemList = (state: ItemListState, action: ItemListAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: [] };
    case AsyncStatus.SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case AsyncStatus.FAILURE:
      return { loading: false, error: action.payload, data: [] };
  }
};

export const itemListReducer = createReducer(initialState, {
  [ITEM_LIST_ACTION_TYPE.GET_ITEM_LIST]: getItemList,
});
