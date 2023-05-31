import { useEffect, useState } from "react";

export const useFetch = <T>(callback: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    callback().then((res) => {
      try {
        if (!res) {
          throw new Error("주문내역 목록이 없습니다.");
        }
        setData(res);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  return { isLoading, data, error };
};
