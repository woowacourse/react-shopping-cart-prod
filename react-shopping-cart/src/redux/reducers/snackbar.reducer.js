const { SET_SNACKBAR_MESSAGE, HIDE_SNAKBAR } = require('redux/actions/snackbar.action');

const initialState = {
  show: false,
  message: '',
};

const snackBar = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR_MESSAGE:
      return { show: true, message: action.payload };
    case HIDE_SNAKBAR:
      return { show: false, message: '' };
    default:
      return state;
  }
};

export default snackBar;
