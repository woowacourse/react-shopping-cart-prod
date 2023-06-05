import { ERROR } from '../constants';

const { PREFIX } = ERROR;

export const fetchApi = async (url: string, options?: RequestInit) => {
  if (!navigator.onLine) throw new Error(`${PREFIX} 네트워크가 오프라인 상태입니다.`);

  const response = await fetch(url, options);

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(`${PREFIX} 잘못된 요청입니다.`);
      case 401:
        throw new Error(`${PREFIX} 인증되지 않은 사용자입니다.`);
      case 403:
        throw new Error(`${PREFIX} 권한이 없습니다.`);
      case 409:
        throw new Error(`${PREFIX} 요청한 리소스가 현재 상태와 충돌합니다.`);
      case 500:
        throw new Error(`${PREFIX} 서버 내부 에러가 발생했습니다.`);
      default:
        throw new Error(`${PREFIX} 알 수 없는 에러가 발생했습니다.`);
    }
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();

    return json;
  }

  return response;
};
