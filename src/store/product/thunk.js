import productActions from 'store/product/action';

import { requestGetProductList } from 'api/products';
import { REQUEST_STATUS } from 'constants/';

const updateList =
  (page = 1) =>
  async (dispatch) => {
    dispatch(productActions.updateList.pending());

    const response = await requestGetProductList(page);
    const { status, content } = response;

    dispatch(
      status === REQUEST_STATUS.SUCCESS
        ? productActions.updateList.success({ productList: content })
        : dispatch(productActions.updateList.error({ errorMessage: content })),
    );

    return response;
  };

const productThunk = { updateList };

export default productThunk;
