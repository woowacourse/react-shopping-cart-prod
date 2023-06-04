import { ResponseResult } from '../types';

const API_ERROR_MESSAGE: Record<number, string> = {
  0: '[ERROR-0] 서버에 연결할 수 없습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
  1001: '[ERROR-1001] 권한이 없습니다. 다시 로그인 해주세요.',
  1002: '[ERROR-1002] 해당 장바구니에 대한 권한이 없습니다.',
  1003: '[ERROR-1003] 존재하지 않는 사용자입니다. 다시 시도해 주세요.',
  1004: '[ERROR-1004] 잘못된 로그인 정보입니다. 다시 시도해 주세요.',
  2001: '[ERROR-2001] 장바구니 정보가 없습니다.',
  2002: '[ERROR-2002] 장바구니에 담을 수 있는 상품의 최대 수량을 초과하였습니다.',
  3001: '[ERROR-3001] 상품 정보가 없습니다.',
  4001: '[ERROR-4001] 쿠폰 정보가 없습니다.',
  4002: '[ERROR-4002] 쿠폰 최대 적용 개수를 초과하였습니다. 쿠폰 1개만 사용해 주세요.',
  4003: '[ERROR-4003] 쿠폰정보와 적용된 할인금액이 다릅니다. 다시 시도해 주세요.',
  4004: '[ERROR-4004] 쿠폰 적용이 가능한 최소 주문금액보다 주문금액이 작습니다.',
  4005: '[ERROR-4005] 만료일이 지난 쿠폰입니다. 새로고침 해주세요.',
  4006: '[ERROR-4006] 해당 사용자의 쿠폰 정보가 아닙니다. 다시 시도해 주세요.',
  5001: '[ERROR-5001] 주문 정보가 없습니다.',
  5002: '[ERROR-5002] 결제예상금액과 결제해야할 금액이 다릅니다.',
  5003: '[ERROR-5003] 주문 금액이 0원 보다 커야 주문이 가능합니다.',
  5004: '[ERROR-5004] 해당 사용자의 주문 정보가 아닙니다. 다시 시도해 주세요.',
  6001: '[ERROR-6001] 유효하지 않은 금액 정보입니다. 다시 시도해 주세요.',
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
      console.log(`${options.method}요청의 response.ok가 아닙니다.`);
      const { errorCode } = await response.json();
      console.log(`${options.method}요청의 에러코드`, errorCode);

      responseResult.statusCode = response.status;
      responseResult.errorCode = errorCode;
      responseResult.errorMessage = API_ERROR_MESSAGE[errorCode];

      return responseResult;
    }

    responseResult.statusCode = response.status;

    const contentType = response.headers.get('Content-Type');
    if (contentType === 'application/json') responseResult.result = await response.json();

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
