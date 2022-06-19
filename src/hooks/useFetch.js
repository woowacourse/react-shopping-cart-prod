import { useState } from 'react';

import { REQUEST_STATUS } from 'constants/';

function useFetch(fetchApi = () => {}) {
  const [asyncState, setAsyncState] = useState({ isLoading: false, isLoaded: false, error: null });
  const { isLoading, isLoaded, error } = asyncState;

  const fetchStart = async (
    requestBody,
    asyncAction = { success: () => {}, error: () => {}, pending: () => {} },
  ) => {
    const updateAsyncState = {
      pending: () => {
        setAsyncState({ isLoading: true, isLoaded: false, error: null });
        asyncAction.pending && asyncAction.pending();
      },
      success: (responseBody) => {
        setAsyncState({ isLoading: false, isLoaded: true, error: null });
        asyncAction.success && asyncAction.success(responseBody);
      },
      error: (errorMessage) => {
        setAsyncState({ isLoading: false, isLoaded: false, error: errorMessage });
        asyncAction.error && asyncAction.error(errorMessage);
      },
    };

    updateAsyncState.pending();

    const { status, body } = await fetchApi(requestBody);

    if (status === REQUEST_STATUS.FAIL) {
      updateAsyncState.error(body.message);
      return;
    }

    updateAsyncState.success(body);
  };

  return { fetchControl: { start: fetchStart }, isLoading, isLoaded, error };
}

export default useFetch;
