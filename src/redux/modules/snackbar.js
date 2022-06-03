export const ACTION_TYPES = {
  TOGGLE_SNACKBAR_OPEN: "TOGGLE_SNACKBAR_OPEN",
  TOGGLE_SNACKBAR_CLOSE: "TOGGLE_SNACKBAR_CLOSE",
};

export const toggleSnackbarOpen = (message) => ({
  type: ACTION_TYPES.TOGGLE_SNACKBAR_OPEN,
  message,
});

export const toggleSnackbarClose = () => ({
  type: ACTION_TYPES.TOGGLE_SNACKBAR_CLOSE,
});

const snackbarInitialState = {
  toggleSnackbar: false,
  snackbarMessage: null,
};

export const snackbarReducer = (state = snackbarInitialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SNACKBAR_OPEN: {
      return {
        ...state,
        toggleSnackbar: true,
        snackbarMessage: action.message,
      };
    }

    case ACTION_TYPES.TOGGLE_SNACKBAR_CLOSE: {
      return {
        ...state,
        toggleSnackbar: false,
        snackbarMessage: null,
      };
    }

    default: {
      return state;
    }
  }
};
