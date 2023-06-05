/* eslint-disable @typescript-eslint/no-throw-literal */

import { useContext, useMemo, useState } from 'react';
import { ErrorBoundaryContext } from 'src/context/ErrorBoundaryContext';

function useError() {
  const context = useContext(ErrorBoundaryContext);

  const [state, setState] = useState<{ error: Error | null; hasError: boolean }>({
    error: null,
    hasError: false,
  });

  const memoized = useMemo(
    () => ({
      resetBoundary: () => {
        context?.reset();
        setState({ error: null, hasError: false });
      },
      showBoundary: (error: Error) =>
        setState({
          error,
          hasError: true,
        }),
    }),
    [context],
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}

export default useError;
