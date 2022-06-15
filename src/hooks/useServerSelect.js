import apiClient from 'apis/apiClient';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogout } from 'reducers/authReducer';
import { doInitializeCartList } from 'reducers/cartReducer';
import { AUTH_API_URL, ROUTES } from 'utils/constants';
import { deleteCookie } from 'utils/cookie';

const useServerSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setServerApi = (name = '이프') => {
    localStorage.setItem('api_name', name);
    apiClient.defaults.baseURL = AUTH_API_URL[name];
    document.title = `${name}의 API가 작동 중인 마르코 장바구니 사이트`;
    navigate(ROUTES.HOME);
    dispatch(doLogout());
    dispatch(doInitializeCartList({ shoppingCart: [] }));
    deleteCookie('accessToken');
  };

  return { setServerApi };
};

export default useServerSelect;
