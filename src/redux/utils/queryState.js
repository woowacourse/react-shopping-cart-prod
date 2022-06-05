const queryState = {
  init: (initialData) => ({
    isLoading: false,
    isError: false,
    error: null,
    data: structuredClone(initialData),
  }),
  pending: (queryState) => ({
    isLoading: true,
    isError: false,
    error: null,
    data: queryState.data,
  }),
  fullfilled: (data) => ({
    isLoading: false,
    isError: false,
    error: null,
    data,
  }),
  rejected: (queryState, error) => ({
    isLoading: false,
    isError: true,
    error,
    data: queryState.data,
  }),
};

export default queryState;
