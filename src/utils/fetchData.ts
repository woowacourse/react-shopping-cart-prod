import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getLocalStorageToken } from 'utils/localStorage';

enum AsyncStatus {
  Pending,
  Success,
  Failure,
}

const wrapPromise = (promise: Promise<unknown>) => {
  let status = AsyncStatus.Pending;
  let response = null;

  const suspender = promise.then(
    res => {
      status = AsyncStatus.Success;
      response = res;
    },
    error => {
      status = AsyncStatus.Failure;
      response = error;
    }
  );

  return {
    read: () => {
      switch (status) {
        case AsyncStatus.Pending:
          throw suspender;
        case AsyncStatus.Success:
          return response;
        case AsyncStatus.Failure:
          throw response;
      }
    },
  };
};

type UseRequestParams = {
  method: string;
  url: string;
  useToken?: boolean;
};

export const fetchData = ({ method, url, useToken = false }: UseRequestParams) => {
  const token = getLocalStorageToken();
  const request = {
    method,
    url,
  };

  if (useToken) {
    request['headers'] = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  const promise = axios(request).then(res => res.data);

  return wrapPromise(promise);
};
