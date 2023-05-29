const BASE_URL = {
  헙크: `${process.env.REACT_APP_BASE_URL_HUBC}`,
  다즐: `${process.env.REACT_APP_BASE_URL_DAZZLE}`,
  베로: `${process.env.REACT_APP_BASE_URL_VERO}`,
} as const;

export default BASE_URL;
