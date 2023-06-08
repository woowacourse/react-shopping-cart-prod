import { isNumericString } from './isNumericString';

describe('isNumericString', () => {
  test('0-9의 숫자로만 이루어진 문자열이면 true를 반환한다.', () => {
    expect(isNumericString('1234')).toBe(true);
  });

  test('0-9의 숫자 이외의 문자를 포함하는 문자열이면 false를 반환한다.', () => {
    expect(isNumericString('1234d')).toBe(false);
  });
});
