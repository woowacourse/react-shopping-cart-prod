import { SNACKBAR_ACTIONS } from 'actions/action';

const initState = {
  isVisible: false,
  message: '',
  status: '',
};

function snackbarReducer(state = initState, action) {
  switch (action.type) {
    case SNACKBAR_ACTIONS.SHOW:
      return {
        ...state,
        isVisible: true,
        message: action.message,
        status: action.status,
      };

    case SNACKBAR_ACTIONS.HIDE:
      return {
        ...state,
        isVisible: false,
        message: '',
        status: action.status,
      };

    default:
      return state;
  }
}

export default snackbarReducer;
