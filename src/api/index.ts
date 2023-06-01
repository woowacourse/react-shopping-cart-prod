import { ResponseResult } from '../types';

export const fetchApi = async (url: string, options: RequestInit) => {
  try {
    if (!navigator.onLine) throw new Error('[ERROR] 네트워크 오프라인이 감지되었습니다.');

    const response = await fetch(url, options);
    if (!response.ok) {
      throw Error(
        `[ERROR] api 요청 중 오류가 발생했습니다. 다시 시도해주세요. (status: ${response.status})`
      );
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType === 'application/json') return await response.json();

    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

const ERROR_MESSAGE: Record<number, string> = {
  0: '[ERROR-0] 네트워크 오프라인이 감지되었습니다. 인터넷 연결을 확인해 주세요.',
  1001: '[ERROR-1001] 잘못된 사용자 정보입니다. 다시 로그인 해주세요.',
  1002: '[ERROR-1002] 해당 장바구니에 대한 권한이 없습니다.',
  2001: '[ERROR-2001] 장바구니 정보가 없습니다.',
  2002: '[ERROR-2002] 장바구니에 담을 수 있는 상품의 최대 수량을 초과하였습니다.',
  3001: '[ERROR-3001] 상품 정보가 없습니다.',
  4001: '[ERROR-4001] 쿠폰 정보가 없습니다.',
  4002: '[ERROR-4002] 쿠폰 최대 적용 개수를 초과하였습니다. 쿠폰 1개만 사용해 주세요.',
  5001: '[ERROR-5001] 주문 정보가 없습니다.',
  5002: '[ERROR-5002] 결제예상금액과 결제해야할 금액이 다릅니다.',
  5003: '[ERROR-5003] 주문 금액이 0원 보다 커야 주문이 가능합니다.',
};

export const fetchApi2 = async <T>(
  url: string,
  options: RequestInit
): Promise<ResponseResult<T>> => {
  try {
    const responseResult: ResponseResult<T> = { result: undefined, statusCode: 200 };

    if (!navigator.onLine) {
      responseResult.statusCode = 0;
      responseResult.errorCode = 0;
      responseResult.errorMessage = ERROR_MESSAGE[responseResult.errorCode];

      return responseResult;
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const { errorCode } = await response.json();
      responseResult.statusCode = response.status;
      responseResult.errorCode = errorCode;
      responseResult.errorMessage = ERROR_MESSAGE[errorCode];
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType === 'application/json') responseResult.result = await response.json();

    return responseResult;
  } catch (error) {
    return {
      result: undefined,
      statusCode: -1,
      errorMessage: '[ERROR] 예기치 못한 오류가 발생했습니다.',
    };
  }
};
