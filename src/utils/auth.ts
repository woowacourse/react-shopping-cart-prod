const isLogin = () =>
  localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

export { isLogin };
