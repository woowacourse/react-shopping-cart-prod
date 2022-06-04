import { createAction } from 'lib/redux-template';

import { reducer } from './reducer';

const userActions = {
  updateInfo: {
    success: (userInfo = {}) => createAction(reducer.updateUserInfo, { userInfo }),
    error: (errorMessage = '') => createAction(reducer.updateUserInfo_Error, { errorMessage }),
  },
  removeInfo: () => createAction(reducer.removeUserInfo),
};

export default userActions;
