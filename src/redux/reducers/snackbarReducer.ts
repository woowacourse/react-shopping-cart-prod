import { SnackbarAction, SnackbarActionType } from 'redux/actions/snackbar';

interface SnackbarState {
  isSnackbarOpen: boolean;
  contentsType: string;
  value?: any;
}

const initialState: SnackbarState = {
  isSnackbarOpen: false,
  contentsType: null,
};

export const snackbarReducer = (state = initialState, action: SnackbarAction) => {
  switch (action.type) {
    case SnackbarActionType.OPEN_SNACKBAR:
      return {
        ...state,
        isSnackbarOpen: true,
        contentsType: action.payload.type,
        value: action.payload.value,
      };
    case SnackbarActionType.CLOSE_SNACKBAR:
      return { ...state, isSnackbarOpen: false };
    default:
      return state;
  }
};
