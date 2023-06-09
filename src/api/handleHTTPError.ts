export const handleHTTPError = (status: number) => {
  switch (status) {
    case 500:
      throw new Error('서버 내부에 오류가 발생했습니다.');
    case 404:
      throw new Error('페이지를 찾을 수 없습니다');
    case 400:
      throw new Error('잘못된 요청입니다.');
    default:
      throw new Error('요청 중에 오류가 발생했습니다.');
  }
};
