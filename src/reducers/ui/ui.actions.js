export const actionTypes = {
  SHOW_SNACKBAR: 'SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'HIDE_SNACKBAR',
};

export const showSnackBar = (payload) => ({
  type: actionTypes.SHOW_SNACKBAR,
  payload,
});

export const hideSnackBar = () => ({
  type: actionTypes.HIDE_SNACKBAR,
});
