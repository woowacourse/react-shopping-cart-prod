export type ErrorResponse = {
  message: string;
};

type FetchedData<T> = {
  data?: T;
  headers: Headers;
};

const BASE_URL = ``;

const fetcher = async <T>(url: string, options?: RequestInit): Promise<FetchedData<T>> => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (response.status >= 500) {
    throw new Error(`서버문제로 HTTP 통신에 실패했습니다. 상태 코드:${response.status}`);
  }

  if (!response.ok) {
    let errorMessage;

    try {
      const errorResponse: ErrorResponse = await response.json();
      errorMessage = errorResponse.message;
    } catch {
      errorMessage = 'error Message를 표시할 수 없습니다. 에러 응답이 json형식이 아닙니다.';
    }

    throw new Error(`HTTP 통신에 실패했습니다. 상태 코드: ${response.status}
    요청 URL: ${url} 
    method: ${options?.method}
    ${errorMessage}`);
  }

  const headers = response.headers;

  if (response.status === 204) {
    return { headers };
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error('응답이 json형식이 아닙니다.');
  }

  return { data, headers };
};

export default fetcher;
