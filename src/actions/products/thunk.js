import { requestGetProductList } from 'api/products';
import { REQUEST_STATUS } from 'constants/';

import * as productsAction from './action';

const getList =
  (page = 1) =>
  async (dispatch) => {
    dispatch(productsAction.getList.pending());

    const response = await requestGetProductList(page);
    const { status, content } = response;

    (status === REQUEST_STATUS.SUCCESS && dispatch(productsAction.getList.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(productsAction.getList.error(content)));

    return response;
  };

export { getList };
