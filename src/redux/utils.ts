enum AsyncStatus {
  PENDING,
  SUCCESS,
  FAILURE,
}

const generateAsyncActionGroup = <T>(asyncActionType: string) => ({
  pending: () => ({
    type: asyncActionType,
    status: AsyncStatus.PENDING,
    payload: null,
  }),
  success: (data?: T) => ({
    type: asyncActionType,
    status: AsyncStatus.SUCCESS,
    payload: data,
  }),
  failure: (message: string) => ({
    type: asyncActionType,
    status: AsyncStatus.FAILURE,
    payload: message,
  }),
});

const createReducer = <T, A>(initialState: T, handlers: A) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export { AsyncStatus, generateAsyncActionGroup, createReducer };
