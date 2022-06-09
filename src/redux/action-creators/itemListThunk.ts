import { itemListAction, ItemListAction } from '../actions/itemList';
import type { Dispatch } from 'redux';
import axios from 'axios';
import { BASE_URL } from 'apis';

export const getItemList = () => async (dispatch: Dispatch<ItemListAction>) => {
  dispatch(itemListAction.getItemList.pending());

  try {
    const response = await axios.get(`${BASE_URL}/products`);

    dispatch(itemListAction.getItemList.success(response.data.products));
  } catch (error) {
    dispatch(itemListAction.getItemList.failure(error.response.data.errorMessage));
  }
};
