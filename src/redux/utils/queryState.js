const queryState = {
  init: () => ({
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
  }),
  pending: () => ({
    isLoading: true,
    isError: false,
    error: null,
    isSuccess: false,
  }),
  fullfilled: () => ({
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: true,
  }),
  rejected: (error) => ({
    isLoading: false,
    isError: true,
    error,
    isSuccess: false,
  }),
};

export default queryState;
