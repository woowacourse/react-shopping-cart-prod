import { itemListAction, ItemListAction } from '../actions/itemList';
import { LOCAL_BASE_URL } from 'apis';
import type { Dispatch } from 'redux';
import axios from 'axios';

export const getItemList = () => async (dispatch: Dispatch<ItemListAction>) => {
  dispatch(itemListAction.getItemList.pending());
  try {
    const response = await axios.get(`${LOCAL_BASE_URL}/itemList`);

    dispatch(itemListAction.getItemList.success(response.data));
  } catch (error) {
    dispatch(itemListAction.getItemList.failure(error.response.data.errorMessage));
  }
};
