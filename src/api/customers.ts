import { API_URL } from '@/api/constants';
import { getCookie } from '@/api/cookie';
import axios from 'axios';

const customersAPI = axios.create({
  baseURL: `${API_URL}/customers`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const checkAuthorization = ({
  isLogged = false,
  isOnlyConfig = false,
  data = {},
  callback,
}) => {
  if (!isLogged) return callback(data);

  const accessToken = getCookie('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (isOnlyConfig) return callback(config);

  return callback(data, config);
};

export const signUp = userInformation => {
  return customersAPI.post('/signup', userInformation);
};

export const login = userInformation => {
  return customersAPI.post('/login', userInformation);
};

export const editUser = (userInformation, config = {}) => {
  return customersAPI.put('/', userInformation, config);
};

export const changePassword = (userInformation, config = {}) => {
  return customersAPI.patch('/password', userInformation, config);
};

export const deleteUser = (config = {}) => {
  return customersAPI.delete('/', config);
};

export const getCustomer = (config = {}) => {
  return customersAPI.get('/', config);
};
