import { API_STATUS, ERROR_MESSAGE } from '../constants/APIStatusCode';
import { ResponseResult } from '../types';

const fetchAPI = async <T>(url: string, options: RequestInit): Promise<ResponseResult<T>> => {
  try {
    const responseResult: ResponseResult<T> = { result: undefined, statusCode: 200 };

    if (!navigator.onLine) {
      responseResult.statusCode = 0;
      responseResult.errorCode = 0;
      responseResult.errorMessage = API_STATUS[responseResult.errorCode][1];

      return responseResult;
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const { errorCode } = await response.json();
      console.error(`${options.method}요청의 에러코드`, errorCode);

      responseResult.statusCode = response.status;
      responseResult.errorCode = errorCode;
      responseResult.errorMessage = API_STATUS[errorCode][1];

      return responseResult;
    }

    responseResult.statusCode = response.status;

    const contentType = response.headers.get('Content-Type');
    if (contentType === 'application/json') responseResult.result = await response.json();

    const locationHeader = response.headers.get('Location');
    if (locationHeader) responseResult.location = locationHeader;

    return responseResult;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);

    return {
      result: undefined,
      statusCode: -1,
      errorMessage: ERROR_MESSAGE.DEFAULT,
    };
  }
};

export default fetchAPI;
