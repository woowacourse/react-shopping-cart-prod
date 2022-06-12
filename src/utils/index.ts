const getCookie = (key: string) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${key.replace('/([.$?*|{}()[]\\/+^])/g', '\\$1')}=([^;]*)`)
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value};`;
};

const deleteCookie = (key: string) => {
  document.cookie = `${key}=`;
};

export { getCookie, setCookie, deleteCookie };
