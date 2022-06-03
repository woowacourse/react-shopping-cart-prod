const setCookie = (name, value) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
};

const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(`${name}=([^;]*)`));

  return matches ? decodeURIComponent(matches[1]) : "";
};

const deleteCookie = (name) => {
  document.cookie = `${encodeURIComponent(name)}=; max-age=-1`;
};

export { setCookie, getCookie, deleteCookie };
