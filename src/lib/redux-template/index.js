import produce from 'immer';

const createReducer =
  (reducer, initialState) =>
  (state = initialState, { type = '', payload = {} }) =>
    produce(state, (draft) => {
      typeof reducer[type] === 'function' && reducer[type](draft, payload);
    });

const createAction = (action, payload) => ({ type: action.name, payload });

const createAsyncState = {
  initial: () => ({
    isLoading: false,
    isLoaded: false,
    error: null,
  }),
  pending: () => ({ isLoading: true, isLoaded: false, error: null }),
  success: () => ({ isLoading: false, isLoaded: true, error: null }),
  error: (error) => ({ isLoading: false, isLoaded: false, error }),
};

export { createReducer, createAction, createAsyncState };
