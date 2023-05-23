import { FetchArgs } from '@Types/index';

import { ERROR_MESSAGE } from '@Constants/index';

export const fetchData = async <T>({ url, method, body }: FetchArgs): Promise<T> => {
  const response = await fetch(url, {
    method,
    body,
  });

  if (response.status === 400) throw new Error(ERROR_MESSAGE[400]);
  if (response.status === 401) throw new Error(ERROR_MESSAGE[401]);
  if (response.status === 403) throw new Error(ERROR_MESSAGE[403]);
  if (response.status === 404) throw new Error(ERROR_MESSAGE[404]);

  if (response.status === 500) throw new Error(ERROR_MESSAGE[500]);

  if (!response.ok) throw new Error(ERROR_MESSAGE.default);

  return await response.json();
};
