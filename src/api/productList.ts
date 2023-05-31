const fetchProductList = async <T>(baseURL: string): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fetch(`${baseURL}/products`, {
        method: 'GET',
      });
      const data = await response.json();

      resolve(data);
    }, 2500);
  });
};

export default fetchProductList;
