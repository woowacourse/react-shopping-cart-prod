import { actionTypes } from 'reducers/ui/ui.actions';

export const initialState = {
  isSnackBarVisibile: false,
  snackBarText: '',
  snackBarType: '',
};

const uiReducer = (state = initialState, { type, payload }) => {
  if (type === actionTypes.SHOW_SNACKBAR) {
    return {
      ...state,
      isSnackBarVisibile: true,
      snackBarText: payload.text,
      snackBarType: payload.type,
    };
  }
  if (type === actionTypes.HIDE_SNACKBAR) {
    return {
      ...state,
      isSnackBarVisibile: false,
      snackBarText: '',
      snackBarType: '',
    };
  }

  return state;
};

export default uiReducer;
