import { CUSTOMERS_API_URL } from '@/api/constants';
import { getCookie } from '@/api/cookie';
import axios from 'axios';
import { authorizedFetcher } from './authorizedFetcher';

const customersAPI = axios.create({
  baseURL: CUSTOMERS_API_URL.TO_CUSTOMERS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = userInformation => {
  return authorizedFetcher({
    requestMethod: customersAPI.post,
    endPoint: '/signup',
    body: userInformation,
  });
};

export const login = userInformation => {
  return authorizedFetcher({
    requestMethod: customersAPI.post,
    endPoint: '/login',
    body: userInformation,
  });
};

export const editUser = userInformation => {
  return authorizedFetcher({
    requestMethod: customersAPI.put,
    endPoint: '/',
    body: userInformation,
    isLogged: true,
  });
};

export const changePassword = userInformation => {
  return authorizedFetcher({
    requestMethod: customersAPI.patch,
    endPoint: '/password',
    body: userInformation,
    isLogged: true,
  });
};

export const deleteUser = () => {
  return authorizedFetcher({
    requestMethod: customersAPI.delete,
    endPoint: '/',
    isLogged: true,
    isOnlyConfig: true,
  });
};

export const getCustomer = () => {
  return authorizedFetcher({
    requestMethod: customersAPI.get,
    endPoint: '/',
    isLogged: true,
    isOnlyConfig: true,
  });
};
