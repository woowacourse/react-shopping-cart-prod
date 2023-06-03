export interface FetchDataProps {
  url: string;
  options?: RequestInit;
}

async function fetchData<T>({ url, options }: FetchDataProps): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();

    throw Error(error.message);
  }

  const data = await response.json();

  return data;
}

export default fetchData;
