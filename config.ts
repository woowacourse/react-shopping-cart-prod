type BaseURL = {
  [name: string]: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const baseURL: BaseURL = { ROY: import.meta.env.VITE_BASE_URL_ROY, SPLIT: import.meta.env.VITE_BASE_URL_SPLIT, IRAE: import.meta.env.VITE_BASE_URL_IRAE };

export default baseURL;
