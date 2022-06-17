import { SET_ERROR_STATUS } from 'redux/actions/errors.action';

const initialState = {
  status: null,
};

function error(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR_STATUS: {
      return { status: action.payload };
    }
    default:
      return state;
  }
}

export default error;
