import axios from 'axios';

const LOCAL_BASE_URL = process.env.REACT_APP_LOCAL_BASE_URL;

export const members = ['승팡', '앤지', '페퍼', '아서'] as const;

export const defaultMember = members[0];

export const BASE_URL_LIST = {
  [members[0]]: process.env.REACT_APP_SP_BASE_URL,
  [members[1]]: process.env.REACT_APP_AJ_BASE_URL,
  [members[2]]: process.env.REACT_APP_PP_BASE_URL,
  [members[3]]: process.env.REACT_APP_AT_BASE_URL,
};
// export const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_LIST.앤지 : LOCAL_BASE_URL;
export const BASE_URL =
  (localStorage.getItem('baseUrl') && JSON.parse(localStorage.getItem('baseUrl'))) ||
  BASE_URL_LIST[defaultMember];

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
