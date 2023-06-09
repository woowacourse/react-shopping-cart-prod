import { getFormattedNextDay, getPercentageNumber } from '@utils/common';

describe('공통 유틸 함수가 올바르게 작동하는 지 확인한다.', () => {
  test.each([
    [1685607102432, '금요일 6/2'], // 6/1일 목요일 timestamp
    [1685757671523, '일요일 6/4'], // 6/3일 토요일 timestamp
  ])(
    '(getFormattedNextDay(%i)일때 %s를 반환해야 합니다.) 다음날 날짜를 가져오는 함수를 실행시키면 다음날의 날짜를 가져온다.',
    (today, expectedResult) => {
      const result = getFormattedNextDay(today);

      expect(result).toBe(expectedResult);
    }
  );

  test.each([
    [40000, 10, 4000], // 기본 케이스
    [500, 50, 250], // 숫자가 작을 때
    [0, 20, 0], // 총 숫자가 0일 때
    [25000, 0, 0], // 퍼센트가 0일 때
    [10000, 100, 10000], // 퍼센트가 100일 때
    [-200, 30, null], // 음수 숫자 입력 시
    [500, -20, null], // 음수 퍼센트 입력 시
    [250, 25.5, 63.75], // 소수점이 포함된 케이스
    [100, 33.33, 33.33], // 소수점 둘째자리 이하 버리는 케이스
    [200, 150, null], // 100보다 큰 퍼센트 입력 시
    [200, -50, null], // 음수 퍼센트 입력 시
    [200, 0.001, 0.002], // 매우 작은 소수 퍼센트 입력 시
  ])('(getPercentageNumber(%i, %i)에서 %i를 반환해야 합니다.) 총 숫자와 퍼센트를 입력받아 해당되는 퍼센트가 숫자 몇인지 반환한다.', (total, percent, expected) => {
    const result = getPercentageNumber({ total, percent });

    expect(result).toBe(expected);
  });
});
