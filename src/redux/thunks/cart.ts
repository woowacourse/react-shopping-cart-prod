import axios from 'configs/api';

import { Dispatch } from 'redux';
import { cartActions } from 'redux/actions/cart';

import PATH from 'constants/path';
import { getAccessToken } from 'utils/auth';

const getCarts = (): any => (dispatch: Dispatch) => {
  const accessToken = getAccessToken();

  dispatch(cartActions.getCartItems());

  axios
    .get(`${PATH.REQUEST_CART_ITEMS}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
      console.log(res, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      dispatch(cartActions.getCartItemsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(cartActions.getCartItemsError());
    });
};

export { getCarts };
