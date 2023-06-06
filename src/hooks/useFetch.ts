import { useEffect, useState } from "react";

export const useFetch = <T>(callback: () => Promise<T>, trigger?: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    callback()
      .then((res) => setData(res))
      .catch((rej) => {
        if (rej instanceof Error) {
          setError(rej);
        }
      })
      .finally(() => setIsLoading(false));
  }, [trigger]);

  return { isLoading, data, error };
};
