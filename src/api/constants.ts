export const { API_URL, setApiUrl } = (() => {
  const url = { current: localStorage.getItem('API_URL') ?? 'http://54.180.159.79:8080/api' };

  return {
    API_URL: url.current,
    setApiUrl: API_URL => {
      localStorage.setItem('API_URL', API_URL);
      url.current = API_URL;
    },
  };
})();

export const PRODUCT_LIST_PAGE_LIMIT = 12;
