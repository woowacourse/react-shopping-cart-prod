import { client } from 'apis';
import type { Dispatch } from 'redux';

import { PageItemListAction, pageItemListActions } from './action';

export const getPageItemListRequest = () => async (dispatch: Dispatch<PageItemListAction>) => {
  dispatch(pageItemListActions.getPageItemListActionGroup.request());
  try {
    const response = await client.get('/products');

    dispatch(pageItemListActions.getPageItemListActionGroup.success(response.data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(pageItemListActions.getPageItemListActionGroup.failure(e));
    }
  }
};
