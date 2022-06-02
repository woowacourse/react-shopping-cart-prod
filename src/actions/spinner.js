import { 스피너_액션 } from './types';

const showSpinner = () => (dispatch) => {
  dispatch({
    type: 스피너_액션.SHOW_SPINNER,
  });
};

const hideSpinner = () => (dispatch) => {
  dispatch({
    type: 스피너_액션.HIDE_SPINNER,
  });
};

export { showSpinner, hideSpinner };
