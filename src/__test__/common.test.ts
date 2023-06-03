import { getFormattedNextDay } from '@utils/common';

describe('공통 유틸 함수가 올바르게 작동하는 지 확인한다.', () => {
  test.each([
    [1685607102432, '금요일 6/2'],
    [1685757671523, '일요일 6/4'],
  ])(
    '(%i일때 %s)다음날 날짜를 가져오는 함수를 실행시키면 다음날의 날짜를 가져온다.',
    (today: number, expectedResult: string) => {
      const result = getFormattedNextDay(today);

      expect(result).toBe(expectedResult);
    }
  );
});
