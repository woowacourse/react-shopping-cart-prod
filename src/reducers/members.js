import produce from 'immer';

import { MEMBERS_ACTIONS } from 'actions/types';

import { createAsyncState } from 'lib/requestUtils';

// logged in

const initialState = {
  isLoggedIn: false,
  userInfo: { id: '', userId: '', nickname: '' },
  userInfoAsyncState: createAsyncState.initial(),
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MEMBERS_ACTIONS.USER_LOGIN_SUCCESS:
    case MEMBERS_ACTIONS.USER_INFO_REFRESH_SUCCESS:
    case MEMBERS_ACTIONS.USER_PROFILE_EDIT_SUCCESS:
    case MEMBERS_ACTIONS.USER_PASSWORD_EDIT_SUCCESS:
    case MEMBERS_ACTIONS.USER_DROP_OUT_SUCCESS:
      return produce(state, (draft) => {
        draft.userInfo = payload;
        draft.isLoggedIn = true;
        draft.userInfoAsyncState = createAsyncState.success();
      });

    case MEMBERS_ACTIONS.USER_LOGIN_ERROR:
    case MEMBERS_ACTIONS.USER_INFO_REFRESH_ERROR:
    case MEMBERS_ACTIONS.USER_PROFILE_EDIT_ERROR:
    case MEMBERS_ACTIONS.USER_PASSWORD_EDIT_ERROR:
    case MEMBERS_ACTIONS.USER_DROP_OUT_ERROR:
      return produce(state, (draft) => {
        draft.userInfoAsyncState = createAsyncState.error(payload);
      });

    case MEMBERS_ACTIONS.USER_LOGOUT:
      return produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.userInfo = { id: '', userId: '', nickname: '' };
      });

    default:
      return state;
  }
};
