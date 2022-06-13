// @ts-nocheck

// actions
const SPINNER_ACTIONS = {
  SHOW: 'spinner/SHOW',
  HIDE: 'spinner/HIDE',
};

// action creator
const doShowSpinner = () => ({ type: SPINNER_ACTIONS.SHOW });
const doHideSpinner = () => ({ type: SPINNER_ACTIONS.HIDE });

// reducer
const initState = { isSpinnerVisible: false };

const spinnerReducer = (state = initState, action) => {
  switch (action.type) {
    case SPINNER_ACTIONS.SHOW:
      return {
        ...state,
        isSpinnerVisible: true,
      };

    case SPINNER_ACTIONS.HIDE:
      return {
        ...state,
        isSpinnerVisible: false,
      };

    default:
      return state;
  }
};

export default spinnerReducer;
export { doShowSpinner, doHideSpinner };
