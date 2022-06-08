import { createAction } from 'lib/redux-template';

import { reducer } from './reducer';

const cartActions = {
  updateList: {
    success: (itemList = []) => createAction(reducer.updateCartList, { itemList }),
    pending: () => createAction(reducer.updateCartList_Pending),
    error: (errorMessage = '') => createAction(reducer.updateCartList_Error, { errorMessage }),
  },

  addItems: {
    success: (items = []) => createAction(reducer.addCartItems, { items }),
    error: (errorMessage = '') => createAction(reducer.addCartItems_Error(errorMessage)),
  },

  updateItem: {
    success: (updatedItem) => createAction(reducer.updateCartItem, { updatedItem }),
    error: (errorMessage = '') => createAction(reducer.updateCartItem_Error, { errorMessage }),
  },

  setItemCheck: (targetId = 0, isChecked = false) =>
    createAction(reducer.setCartItemCheck, { targetId, isChecked }),

  setAllItemCheck: (isChecked = false) => createAction(reducer.setAllCartItemCheck, { isChecked }),

  removeItem: {
    success: (targetId = 0) => createAction(reducer.removeCartItem, { targetId }),
    error: (errorMessage = '') => createAction(reducer.removeCartItem_Error, { errorMessage }),
  },

  removeItems: {
    success: (targetIdList = []) => createAction(reducer.removeCartItems, { targetIdList }),
    error: (errorMessage = '') => createAction(reducer.removeCartItems_Error, { errorMessage }),
  },
};

export default cartActions;
