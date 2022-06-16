import { UserAction, USER_ACTION_TYPE } from 'redux/actions/user';
import { AsyncStatus, createReducer } from 'redux/utils';

interface UserState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: {},
  loading: false,
  error: null,
};

const postSignUp = (state: UserState, action: UserAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };
    case AsyncStatus.SUCCESS:
      return { loading: false, error: null, data: state.data };
    case AsyncStatus.FAILURE:
      return { loading: false, error: action.payload, data: state.data };
  }
};

const postSignIn = (state: UserState, action: UserAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };
    case AsyncStatus.SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case AsyncStatus.FAILURE:
      return { loading: false, error: action.payload, data: state.data };
  }
};

const patchNewPassword = (state: UserState, action: UserAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };
    case AsyncStatus.SUCCESS:
      return { loading: false, error: null, data: state.data };
    case AsyncStatus.FAILURE:
      return { loading: false, error: action.payload, data: state.data };
  }
};

const deleteUser = (state: UserState, action: UserAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };
    case AsyncStatus.SUCCESS:
      return { loading: false, error: null, data: {} };
    case AsyncStatus.FAILURE:
      return { loading: false, error: action.payload, data: state.data };
  }
};

const autoSignIn = (state: UserState, action: UserAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };
    case AsyncStatus.SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case AsyncStatus.FAILURE:
      return { loading: false, error: action.payload, data: state.data };
  }
};

const signOut = () => {
  return { loading: false, error: null, data: {} };
};

export const userReducer = createReducer(initialState, {
  [USER_ACTION_TYPE.POST_SIGN_UP]: postSignUp,
  [USER_ACTION_TYPE.POST_SIGN_IN]: postSignIn,
  [USER_ACTION_TYPE.PATCH_NEW_PASSWORD]: patchNewPassword,
  [USER_ACTION_TYPE.DELETE_USER]: deleteUser,
  [USER_ACTION_TYPE.AUTO_SIGN_IN]: autoSignIn,
  [USER_ACTION_TYPE.SIGN_OUT]: signOut,
});
