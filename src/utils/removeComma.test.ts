import { removeComma } from './removeComma';

describe('removeComma', () => {
  test('문자열에서 콤마를 제거한다. (2,000 -> 2000)', () => {
    const str = '2,000';

    expect(removeComma(str)).toBe('2000');
  });
});
