import { ACCESS_TOKEN_COOKIE_NAME } from 'constants/';
import { removeCookie } from 'lib/cookieUtils';
import { createAction } from 'lib/redux-template';

import { reducer } from './reducer';

const userActions = {
  updateInfo: {
    success: (userInfo = {}) => createAction(reducer.updateUserInfo, { userInfo }),
    pending: () => createAction(reducer.updateUserInfo_Pending),
    error: (errorMessage = '') => createAction(reducer.updateUserInfo_Error, { errorMessage }),
  },
  removeInfo: () => {
    removeCookie(ACCESS_TOKEN_COOKIE_NAME);

    return createAction(reducer.removeUserInfo);
  },
};

export default userActions;
