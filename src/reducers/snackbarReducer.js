// Action Types
const SNACKBAR_ACTIONS = {
  SHOW: 'snackbar/SHOW',
  HIDE: 'snackbar/HIDE',
};

// Initial State
const initState = {
  isVisible: false,
  message: '',
  status: '',
};

// Action Creators
export const showSnackbar = ({ message, status }) => ({
  type: SNACKBAR_ACTIONS.SHOW,
  message,
  status,
});

export const hideSnackbar = () => ({ type: SNACKBAR_ACTIONS.HIDE });

// Reducers
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
