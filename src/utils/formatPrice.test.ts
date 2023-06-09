import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  test('세 자리 이하 숫자를 `원`을 포함하는 문자열로 변환한다.', () => {
    expect(formatPrice(300)).toBe(`300원`);
  });

  test('네 자리 이상 숫자를 `원`과 콤마를 포함하는 문자열로 변환한다.', () => {
    expect(formatPrice(3_000)).toBe(`3,000원`);
  });
});
