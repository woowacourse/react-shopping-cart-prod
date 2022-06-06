import { CUSTOMERS_API_URL } from '@/api/constants';
import { getCookie } from '@/api/cookie';
import axios from 'axios';

const customersAPI = axios.create({
  baseURL: CUSTOMERS_API_URL.TO_CUSTOMERS,
  headers: {
    'Content-Type': 'application/json',
  },
});

const checkAuthorization = ({
  requestMethod,
  endPoint,
  data = {},
  isLogged = false,
  isOnlyConfig = false,
}) => {
  if (!isLogged) return requestMethod(endPoint, data);

  const accessToken = getCookie('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (isOnlyConfig) return requestMethod(endPoint, config);

  return requestMethod(endPoint, data, config);
};

export const signUp = userInformation => {
  return checkAuthorization({
    requestMethod: customersAPI.post,
    endPoint: '/signup',
    data: userInformation,
  });
};

export const login = userInformation => {
  return checkAuthorization({
    requestMethod: customersAPI.post,
    endPoint: '/login',
    data: userInformation,
  });
};

export const editUser = userInformation => {
  return checkAuthorization({
    requestMethod: customersAPI.put,
    endPoint: '/',
    data: userInformation,
    isLogged: true,
  });
};

export const changePassword = userInformation => {
  return checkAuthorization({
    requestMethod: customersAPI.patch,
    endPoint: '/password',
    data: userInformation,
    isLogged: true,
  });
};

export const deleteUser = () => {
  return checkAuthorization({
    requestMethod: customersAPI.delete,
    endPoint: '/',
    isLogged: true,
    isOnlyConfig: true,
  });
};

export const getCustomer = () => {
  return checkAuthorization({
    requestMethod: customersAPI.get,
    endPoint: '/',
    isLogged: true,
    isOnlyConfig: true,
  });
};
