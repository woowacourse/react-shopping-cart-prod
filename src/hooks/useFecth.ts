import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSnackbar } from '@/hooks/useSnackbar';

export const useThunkFetch = ({ selector, thunkAction, deps }): RootState | any => {
  const data = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkAction());
  }, deps);

  return data;
};

export const useFetch = ({ action, deps }) => {
  const [response, setResponse] = useState({ isLoading: true, isError: false, data: null });

  const { triggerFailedSnackbar } = useSnackbar();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await action();

        setResponse(prev => ({ ...prev, isLoading: false, data }));
      } catch ({
        response: {
          data: { error },
        },
      }) {
        setResponse(prev => ({ ...prev, isLoading: false, isError: true }));

        triggerFailedSnackbar(error?.messages[0]);
      }
    };
    fetch();
  }, deps);

  return response;
};
