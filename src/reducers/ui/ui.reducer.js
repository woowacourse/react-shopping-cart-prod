import { actionTypes } from 'reducers/ui/ui.actions';

export const initialState = {
  isSnackBarVisible: false,
  snackBarText: '',
  snackBarType: '',
};

const uiReducer = (state = initialState, { type, payload }) => {
  if (type === actionTypes.SHOW_SNACKBAR) {
    return {
      ...state,
      isSnackBarVisible: true,
      snackBarText: payload.text,
      snackBarType: payload.type,
    };
  }
  if (type === actionTypes.HIDE_SNACKBAR) {
    return {
      ...state,
      isSnackBarVisible: false,
      snackBarText: '',
      snackBarType: '',
    };
  }

  return state;
};

export default uiReducer;
