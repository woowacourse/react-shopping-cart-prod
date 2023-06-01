import { useApiBaseUrlValue } from '@recoils/recoilApiBaseUrl';

const cache = new Map();

export const useFetchAsync = (url: string) => {
  const baseUrl = useApiBaseUrlValue();
  const fetchUrl = `${baseUrl}/${url}`;

  const state = cache.get(fetchUrl);
  switch (state?.status) {
    case undefined: {
      const promise = new Promise((resolve, reject) => {
        fetch(fetchUrl)
          .then((res) => res.json())
          .then((data) => {
            cache.set(fetchUrl, {
              status: 'ready',
              data,
            });
            resolve(fetchUrl);
          })
          .catch((error) => {
            cache.set(fetchUrl, {
              status: 'errored',
              error,
            });
            reject(error);
          });
      });
      cache.set(fetchUrl, {
        status: 'pending',
        promise,
      });
      throw promise;
    }
    case 'pending':
      throw state.promise;
    case 'ready':
      return state.data;
    case 'errored':
      throw state.error;
  }
};
