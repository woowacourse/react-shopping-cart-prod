const userServerUrlList: Record<string, string | undefined> = {
  로지: process.env.REACT_APP_SERVER_BASE_URL_LOGI,
  아마란스: process.env.REACT_APP_SERVER_BASE_URL_AMARANTH,
  에코: process.env.REACT_APP_SERVER_BASE_URL_ECO,
} as const;

export default userServerUrlList;
