import { getCookie } from './cookie';

const accessToken = getCookie('accessToken');

const headers = {
  Authorization: `Bearer ${accessToken}`,
  'Access-Control-Allow-Origin': '*',
};

export default headers;
