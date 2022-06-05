import { getCookie } from './cookie';

const accessToken = getCookie('accessToken');

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

export default headers;
