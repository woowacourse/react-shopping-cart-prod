const setCookie = (targetKey, value, expire = 3600) => {
  const expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + expire);

  document.cookie = `${targetKey}=${encodeURIComponent(
    value,
  )}; expires=${expireDate.toUTCString()};`;
};

const getCookie = (targetKey) =>
  document.cookie
    ?.split('; ')
    ?.find((row) => row.startsWith(targetKey))
    ?.split('=')[1];

const removeCookie = (targetKey) => {
  setCookie(targetKey, '', -1);
};

export { setCookie, getCookie, removeCookie };
