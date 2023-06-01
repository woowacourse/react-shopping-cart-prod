import { getFormattedNextDay } from '@utils/common';

describe('공통 유틸 함수가 올바르게 작동하는 지 확인한다.', () => {
  test('다음날 날짜를 가져오는 함수를 실행시키면 다음날의 날짜를 가져온다. ', () => {
    const today = 1685607102432; // 목요일  6/01 2023

    const result = getFormattedNextDay(today);

    expect(result).toBe('금요일 6/2');
  });
});
