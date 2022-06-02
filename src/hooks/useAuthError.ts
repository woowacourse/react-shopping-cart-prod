import { useEffect } from 'react';
import { resetError } from 'redux/user/action';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

const useAuthError = (callback: () => void) => {
  const { error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      callback();
      dispatch(resetError());
    }
  }, [error]);
};

export default useAuthError;
