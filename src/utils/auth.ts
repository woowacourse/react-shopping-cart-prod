const isLogin = () => !!sessionStorage.getItem('accessToken');

const getAccessToken = () => sessionStorage.getItem('accessToken');

export { isLogin, getAccessToken };
