// @ts-nocheck

// actions
const SNACKBAR_ACTIONS = {
  SHOW: 'snackbar/SHOW',
  HIDE: 'snackbar/HIDE',
};

// action creator
const doShowSnackbar = ({ message, status }) => ({ type: SNACKBAR_ACTIONS.SHOW, message, status });
const doHideSnackbar = () => ({ type: SNACKBAR_ACTIONS.HIDE });

// reducer
const initState = {
  isSnackbarVisible: false,
  message: '',
  status: '',
};

const snackbarReducer = (state = initState, action) => {
  switch (action.type) {
    case SNACKBAR_ACTIONS.SHOW:
      return {
        ...state,
        isSnackbarVisible: true,
        message: action.message,
        status: action.status,
      };

    case SNACKBAR_ACTIONS.HIDE:
      return {
        ...state,
        isSnackbarVisible: false,
        message: '',
        status: action.status,
      };

    default:
      return state;
  }
};

export default snackbarReducer;
export { doShowSnackbar, doHideSnackbar };
