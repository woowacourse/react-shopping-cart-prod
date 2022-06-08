import { Item } from 'types/domain';
import { ItemListAction, ItemListActionType } from '../actions/itemList';

export interface ItemListState {
  loading: boolean;
  error: string | null;
  data: Item[];
}

export const initialItemListState: ItemListState = {
  loading: false,
  error: null,
  data: [],
};

export const itemListReducer = (state = initialItemListState, action: ItemListAction) => {
  switch (action.type) {
    case ItemListActionType.GET_ITEM_LIST_START:
      return { loading: true, error: null, data: [] };
    case ItemListActionType.GET_ITEM_LIST_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ItemListActionType.GET_ITEM_LIST_FAILURE:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
