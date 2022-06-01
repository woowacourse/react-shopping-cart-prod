import { UserAction, UserActionType } from 'redux/actions/user';

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

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionType.POST_SIGN_UP_START:
      return { loading: true, error: null, data: state.data };
    case UserActionType.POST_SIGN_UP_SUCCESS:
      return { loading: false, error: null, data: state.data };
    case UserActionType.POST_SIGN_UP_FAILURE:
      return { loading: false, error: true, data: state.data };

    case UserActionType.POST_SIGN_IN_START:
      return { loading: true, error: null, data: state.data };
    case UserActionType.POST_SIGN_IN_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case UserActionType.POST_SIGN_IN_FAILURE:
      return { loading: false, error: true, data: state.data };

    case UserActionType.PATCH_NEW_PASSWORD_START:
      return { loading: true, error: null, data: state.data };
    case UserActionType.PATCH_NEW_PASSWORD_SUCCESS:
      return { loading: false, error: null, data: state.data };
    case UserActionType.PATCH_NEW_PASSWORD_FAILURE:
      return { loading: false, error: true, data: state.data };

    /*case UserActionType.PATCH_USER_INFO_START:
      return { loading: true, error: null, data: state };
    case UserActionType.PATCH_USER_INFO_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case UserActionType.PATCH_USER_INFO_FAILURE:
      return { loading: false, error: true, data: state.data };*/

    case UserActionType.SIGN_OUT_ACTION:
      return { ...initialState };
    default:
      return state;
  }
};
