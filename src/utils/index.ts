const findElementIndex = (array: any[], key: string, value: any) => {
  return array.findIndex((elem) => elem[key] === value);
};

const getCookie = (key: string) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${key.replace('/([.$?*|{}()[]\\/+^])/g', '\\$1')}=([^;]*)`)
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export { findElementIndex, getCookie };
