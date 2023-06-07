import { MESSAGE } from 'src/constants';

export interface FetchDataProps {
  url: string;
  options?: RequestInit;
}

async function fetchData<T>({ url, options }: FetchDataProps): Promise<T> {
  if (!navigator.onLine) {
    throw new Error(MESSAGE.NETWORK_ERROR);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();

    throw Error(error.errorMessage);
  }

  const data = await response.json();
  return data;
}

export default fetchData;
