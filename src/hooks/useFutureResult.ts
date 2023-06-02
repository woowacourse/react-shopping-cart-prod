import { useMemo, useState } from 'react';
import type Future from '../utils/Future';

type FutureResult<TData> =
  | {
      isLoading: false;
      isFulfilled: false;
    }
  | {
      isLoading: true;
      isFulfilled: false;
    }
  | {
      isLoading: false;
      isFulfilled: true;
      data: TData;
    }
  | {
      isLoading: false;
      isFulfilled: false;
      error: unknown;
    };

const useFutureResult = <TData>(future: Future<TData> | null): FutureResult<TData> => {
  const [key, setKey] = useState({});
  const rerender = () => setKey({});

  const result: FutureResult<TData> = useMemo(() => {
    if (future === null) {
      return { isLoading: false, isFulfilled: false };
    }
    try {
      const data = future.unwrap();
      return { isLoading: false, isFulfilled: true, data };
    } catch (thrown) {
      if (thrown instanceof Promise) {
        thrown.then(rerender).catch(rerender);

        return { isLoading: true, isFulfilled: false };
      }
      return { isLoading: false, isFulfilled: false, error: thrown };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [future, key]);

  return result;
};

export default useFutureResult;
