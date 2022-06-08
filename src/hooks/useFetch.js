import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_PATH, STORAGE_KEY } from '../constants';
import { useDispatch } from 'react-redux';
import { actionTypes } from '../store/cart/cart.actions';

const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

const useFetch = (url) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const requestData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        if (accessToken) {
          const { data } = await axios.get(SERVER_PATH.CARTS, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          dispatch({
            type: actionTypes.GET_CART_SUCCESS,
            payload: data,
          });
        }
        setData(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    requestData();
  }, []);

  return { data, isLoading, isError };
};

export default useFetch;
