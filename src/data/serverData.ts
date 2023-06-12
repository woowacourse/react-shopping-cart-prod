const userServerUrlList: Record<string, string | undefined> = {
  MSW: '',
  로지: process.env.REACT_APP_SERVER_BASE_URL_ROSIE,
  아마란스: process.env.REACT_APP_SERVER_BASE_URL_AMARANTH,
  에코: process.env.REACT_APP_SERVER_BASE_URL_ECHO,
} as const;

export default userServerUrlList;
