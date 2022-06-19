import { actionTypes } from 'reducers/ui/ui.actions';

export const initialState = {
  isSnackBarVisibile: false,
  snackBarText: '',
  snackBarType: '',
};

const uiReducer = (state = initialState, { type, payload }) => {
  // SHOW_SNACKBAR
  if (type === `${actionTypes.SHOW_SNACKBAR}_PENDING`) return state;
  if (type === `${actionTypes.SHOW_SNACKBAR}_FULFILLED`) {
    return {
      ...state,
      isSnackBarVisibile: true,
      snackBarText: payload.text,
      snackBarType: payload.type,
    };
  }
  if (type === `${actionTypes.SHOW_SNACKBAR}_REJECTED`) return state;

  // HIDE_SNACKBAR
  if (type === `${actionTypes.HIDE_SNACKBAR}_PENDING`) return state;
  if (type === `${actionTypes.HIDE_SNACKBAR}_FULFILLED`) {
    return {
      ...state,
      isSnackBarVisibile: false,
      snackBarText: '',
      snackBarType: '',
    };
  }
  if (type === `${actionTypes.HIDE_SNACKBAR}_REJECTED`) return state;

  return state;
};

export default uiReducer;
