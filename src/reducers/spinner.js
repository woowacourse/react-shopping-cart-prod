import { 스피너_액션 } from 'actions/types';

const initialState = {
  isPending: false,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case 스피너_액션.SHOW_SPINNER:
      return { isPending: true };

    case 스피너_액션.HIDE_SPINNER:
      return { isPending: false };

    default:
      return state;
  }
};
