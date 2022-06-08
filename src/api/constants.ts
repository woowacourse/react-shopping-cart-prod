// eslint-disable-next-line no-undef

const generateAPIURL = () => {
  const nickname = prompt('닉네임입력해줘');

  if (nickname === '오리') {
    return 'http://54.180.159.79:8080/api';
  }

  if (nickname === '짱구') {
    return 'http://3.34.183.107:8080/api';
  }

  if (nickname === '써머') {
    return 'http://13.125.134.114:8080';
  }

  alert('🐥 당첨 !');

  return 'http://54.180.159.79:8080/api';
};
// export const API_URL = process.env.REACT_APP_API_URL;
export const API_URL = generateAPIURL();

export const PRODUCT_LIST_PAGE_LIMIT = 12;
