import { useState, useEffect } from "react";

export const useFetch = (getFunc, initialData = {}, isEffect = true) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getItems = async () => {
    try {
      const response = await getFunc();

      const data = await response.json();
      if (data.message) {
        throw new Error(data.message);
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
