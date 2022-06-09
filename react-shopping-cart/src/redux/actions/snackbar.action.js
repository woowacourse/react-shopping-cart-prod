export const SET_SNACKBAR_MESSAGE = 'snackbar/SET_SNACKBAR_MESSAGE';
export const HIDE_SNAKBAR = 'snackbar/HIDE_SNACKBAR';

export const setSnackBarMessage = message => ({ type: SET_SNACKBAR_MESSAGE, payload: message });
export const hideSnackBar = () => ({ type: HIDE_SNAKBAR });
