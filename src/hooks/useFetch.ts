/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

interface UseFetchProps<I, T> {
  fetch: (arg: I) => Promise<T>;
  arg: I;
  key: string;
  suspense?: boolean;
}

function useFetch<I, T>({ fetch, arg, key, suspense = false }: UseFetchProps<I, T>) {
  const [isTriggerd, setIsTriggerd] = useState<Record<typeof key, boolean>>({ [key]: false });
  function resolvePromise(result: T) {
    // promsie fulfilled
    setStatus('fulfilled');
    setResult(result);
  }
  function rejectPromise(error: Error) {
    // promsie rejected
    setStatus('error');
    setError(error);
  }
  const [promise, setPromise] = useState<Promise<void>>();
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'error'>('pending');
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (isTriggerd[key] === false) {
      setStatus('pending');
      setPromise(fetch(arg).then(resolvePromise, rejectPromise));
      setIsTriggerd(prev => ({ ...prev, [key]: true }));
    }
  }, [arg]);

  if (status === 'pending' && promise && suspense) {
    throw promise; // * suspense fallback *
  }
  if (status === 'error') {
    throw error; // error
  }

  const refreshFetch = (refreshArg: I) => {
    setStatus('pending');
    setPromise(fetch(refreshArg).then(resolvePromise, rejectPromise));
    setIsTriggerd(prev => ({ ...prev, [key]: true }));
  };

  return { result, refreshFetch }; // rendering result
}

export default useFetch;
