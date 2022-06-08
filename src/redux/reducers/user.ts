import { Action } from 'types';

import { TYPES } from 'redux/actions';

const initialState = {
  isLoading: false,
  error: null,
  info: {},
  id: null,
};

function user(state = initialState, action: Action) {
  switch (action.type) {
    case `${TYPES.INIT_USER_STATE}`: {
      return initialState;
    }
    case `${TYPES.GET_USER_ID}`: {
      return { ...state, id: action.payload };
    }
    case `${TYPES.GET_USER_INFO}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_USER_INFO}_FULFILLED`: {
      const { name, profileImageUrl } = action.payload;
      return { ...state, isLoading: false, info: { name, profileImageUrl } };
    }
    case `${TYPES.GET_USER_INFO}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
}

export default user;
