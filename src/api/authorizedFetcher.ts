import { clearCache } from './cache';
import { getCookie } from './cookie';

export const authorizedFetcher = ({
  requestMethod,
  endPoint,
  body = {},
  cachePath = '',
  options = {},
  isLogged = false,
  isOnlyConfig = false,
}) => {
  if (!isLogged) return requestMethod(endPoint, body);

  const accessToken = getCookie('access-token');
  const config = {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (cachePath) {
    clearCache(`${cachePath}_${accessToken}`);
  }

  if (isOnlyConfig) return requestMethod(endPoint, config);

  return requestMethod(endPoint, body, config);
};
