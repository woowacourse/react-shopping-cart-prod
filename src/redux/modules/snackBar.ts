type Action = ReturnType<typeof show> | ReturnType<typeof hide>;

const initialState = {
  isShowSnackBar: false,
  message: '',
};

const SHOW = 'snack/SHOW' as const;
const HIDE = 'snack/HIDE' as const;

const show = (message: string) => ({
  type: SHOW,
  payload: { message },
});
const hide = () => ({
  type: HIDE,
});

const snackBarReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SHOW: {
      const { message } = action.payload;

      return { ...state, isShowSnackBar: true, message };
    }
    case HIDE: {
      return { ...state, isShowSnackBar: false, message: '' };
    }
    default:
      return state;
  }
};

export { show, hide };

export default snackBarReducer;
