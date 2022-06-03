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

    case UserActionType.DELETE_USER_START:
      return { loading: true, error: null, data: state.data };
    case UserActionType.DELETE_USER_SUCCESS:
      return { ...initialState };
    case UserActionType.DELETE_USER_FAILURE:
      return { loading: false, error: true, data: state.data };

    case UserActionType.AUTO_SIGN_IN_START:
      return { loading: true, error: null, data: state.data };
    case UserActionType.AUTO_SIGN_IN_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case UserActionType.AUTO_SIGN_IN_FAILURE:
      return { loading: false, error: true, data: state.data };

    /* TODO - 회원 이름 수정 api 명세 작성 후 연동
    case UserActionType.PATCH_USER_INFO_START:
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
