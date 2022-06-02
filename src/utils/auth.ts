const isLogin = () =>
  !!(
    localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  );

const getAccessToken = () =>
  localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

export { isLogin, getAccessToken };
