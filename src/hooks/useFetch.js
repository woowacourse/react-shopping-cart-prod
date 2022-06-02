import { useState, useEffect } from "react";

export const useFetch = (getFunc, initialData = {}, isEffect = true) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getItems = async () => {
    try {
      const response = await getFunc();

      if (!response.ok) {
        throw new Error(`문제가 발생했습니다. 잠시 후에 다시 시도해 주세요 :(`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error(`저장된 정보가 없습니다. 다시 시도해 주세요 :(`);
      }

      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    isEffect && getItems();
  }, []);

  return { data, isLoading, errorMessage, getItems };
};
