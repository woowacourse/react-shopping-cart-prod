import { createAction } from 'lib/redux-template';

import { reducer } from './reducer';

const userActions = {
  updateInfo: {
    success: (userInfo = {}) => createAction(reducer.updateUserInfo, { userInfo }),
    pending: () => createAction(reducer.updateUserInfo_Pending),
    error: (errorMessage = '') => createAction(reducer.updateUserInfo_Error, { errorMessage }),

    initial: () => createAction(reducer.updateUserInfo_Initial),
  },
  removeInfo: () => createAction(reducer.removeUserInfo),
};

export default userActions;
