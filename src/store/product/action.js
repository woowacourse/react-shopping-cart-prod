import { createAction } from 'lib/redux-template';

import { reducer } from './reducer';

const productActions = {
  updateList: {
    success: (productList = []) => createAction(reducer.updateProductList, { productList }),
    pending: () => createAction(reducer.updateProductList_Pending),
    error: (errorMessage = '') => createAction(reducer.updateProductList_Error, { errorMessage }),
  },
};

export default productActions;
