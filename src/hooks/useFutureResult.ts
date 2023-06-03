import { useMemo, useState } from 'react';
import type Future from '../utils/Future';

type FutureResult<TData> =
  | {
      isLoading: false;
      isFulfilled: false;
      isError: false;
    }
  | {
      isLoading: true;
      isFulfilled: false;
      isError: false;
    }
  | {
      isLoading: false;
      isFulfilled: true;
      isError: false;
      data: TData;
    }
  | {
      isLoading: false;
      isFulfilled: false;
      isError: true;
      error: unknown;
    };

const useFutureResult = <TData>(future: Future<TData> | null): FutureResult<TData> => {
  const [key, setKey] = useState({});
  const rerender = () => setKey({});

  const result: FutureResult<TData> = useMemo(() => {
    if (future === null) {
      return { isLoading: false, isFulfilled: false, isError: false };
    }
    try {
      const data = future.unwrap();
      return { isLoading: false, isFulfilled: true, isError: false, data };
    } catch (thrown) {
      if (thrown instanceof Promise) {
        thrown.then(rerender).catch(rerender);

        return { isLoading: true, isError: false, isFulfilled: false };
      }
      return { isLoading: false, isFulfilled: false, isError: true, error: thrown };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [future, key]);

  return result;
};

export default useFutureResult;
