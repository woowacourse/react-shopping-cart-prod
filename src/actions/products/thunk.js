import productActions from 'store/product/action';

import { requestGetProductList } from 'api/products';
import { REQUEST_STATUS } from 'constants/';

import * as productsAction from './action';

const getList =
  (page = 1) =>
  async (dispatch) => {
    dispatch(productActions.updateProductList.pending());

    const response = await requestGetProductList(page);
    const { status, content } = response;

    dispatch(
      status === REQUEST_STATUS.SUCCESS
        ? productActions.updateProductList.success({ productList: content })
        : dispatch(productActions.updateProductList.error({ errorMessage: content })),
    );

    return response;
  };

export { getList };
