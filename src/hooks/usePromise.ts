import { useCallback, useEffect, useState } from 'react';

const usePromise = <T>(promiseMaker: () => Promise<T>) => {
  const [data, setData] = useState<T | null>();
  const [promise, setPromise] = useState<Promise<void>>();
  const [error, setError] = useState<Error | null>(null);

  const extractData = useCallback(async () => {
    try {
      const res = await promiseMaker();
      setData(res);
      setError(null);
    } catch (e) {
      if (!(e instanceof Error)) return;
      setError(e);
    }
  }, [promiseMaker]);

  useEffect(() => {
    setData(null);
    setError(null);
    setPromise(extractData());
  }, [promiseMaker, extractData]);

  const getData = () => {
    if (error) throw error;

    if (data === null && promise) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw promise;
    }

    return data;
  };

  return { getData };
};

export default usePromise;
