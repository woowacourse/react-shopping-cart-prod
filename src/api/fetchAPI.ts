import { ResponseResult } from '../types';

const API_ERROR_MESSAGE: Record<number, string> = {
  0: '[ERROR-0] 서버에 연결할 수 없습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
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

const ERROR_MESSAGE = {
  DEFAULT: '[ERROR] 알 수 없는 오류가 발생했습니다. 문제가 지속되면 관리자에게 문의해주세요.',
};

const fetchAPI = async <T>(url: string, options: RequestInit): Promise<ResponseResult<T>> => {
  try {
    const responseResult: ResponseResult<T> = { result: undefined, statusCode: 200 };

    if (!navigator.onLine) {
      responseResult.statusCode = 0;
      responseResult.errorCode = 0;
      responseResult.errorMessage = API_ERROR_MESSAGE[responseResult.errorCode];

      return responseResult;
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const { errorCode } = await response.json();
      responseResult.statusCode = response.status;
      responseResult.errorCode = errorCode;
      responseResult.errorMessage = API_ERROR_MESSAGE[errorCode];
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType === 'application/json') responseResult.result = await response.json();

    return responseResult;
  } catch (error) {
    return {
      result: undefined,
      statusCode: -1,
      errorMessage: ERROR_MESSAGE.DEFAULT,
    };
  }
};

export default fetchAPI;
