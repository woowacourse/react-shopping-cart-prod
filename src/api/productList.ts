const fetchProductList = async <T>(baseURL: string): Promise<T> => {
  const response = await fetch(`${baseURL}/products`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
};

export default fetchProductList;
