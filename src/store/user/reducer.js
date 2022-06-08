import { createReducer, createAsyncState } from 'lib/redux-template';

const initialState = {
  isLogin: false,
  userInfo: { id: -1, userId: '', nickname: '' },
  userInfoAsyncState: createAsyncState.initial(),
};

const reducer = {
  updateUserInfo(state, { userInfo = {} }) {
    state.isLogin = true;
    state.userInfo = userInfo;
    state.userInfoAsyncState = createAsyncState.success();
  },

  updateUserInfo_Pending(state) {
    state.userInfoAsyncState = createAsyncState.pending();
  },

  updateUserInfo_Error(state, { errorMessage = '' }) {
    state.isLogin = false;
    state.userInfoAsyncState = createAsyncState.error(errorMessage);
  },

  removeUserInfo(state) {
    state.isLogin = false;
    state.userInfo = { ...initialState.userInfo };
    state.userInfoAsyncState = createAsyncState.success();
  },
};

const userReducer = createReducer(reducer, initialState);

export { userReducer, reducer };
