import { getDateFromISOString } from './getDateFromISOString';

describe('getDateFromISOString', () => {
  test('`2023-06-05T14:48:00.000Z` 형식의 문자열을 `2023-06-05`로 변환한다.', () => {
    expect(getDateFromISOString('2023-06-05T14:48:00.000Z')).toBe('2023-06-05');
  });
});
