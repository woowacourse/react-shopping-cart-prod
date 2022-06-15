import { useEffect } from 'react';
import { getUser } from 'redux/user/thunk';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

const useUser = ({
  onSuccess,
  onFailure,
  withoutToken,
}: {
  onSuccess?: (...args) => void;
  onFailure?: (...args) => void;
  withoutToken?: (...args) => void;
} = {}) => {
  const isLogin = useAppSelector(state => !!state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
      withoutToken?.();

      return;
    }

    dispatch(getUser())
      .then(onSuccess && onSuccess)
      .catch(() => {
        onFailure?.();
        localStorage.removeItem('access-token');
      });
  }, []);

  return { isLogin };
};

export default useUser;
