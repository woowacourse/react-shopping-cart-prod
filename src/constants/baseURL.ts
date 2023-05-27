type BaseURL = {
  [name: string]: string;
};

export const BASE_URL: BaseURL = {
  ROY: process.env.REACT_APP_BASE_URL_ROY || '',
  SPLIT: process.env.REACT_APP_BASE_URL_SPLIT || '',
  IRAE: process.env.REACT_APP_BASE_URL_IRAE || '',
};
