export const showInputErrorMessage = (
  isError: boolean,
  inputElement: HTMLInputElement | null,
  errorMessage: string
) => {
  if (!inputElement) return;

  if (!isError) {
    inputElement.setCustomValidity('');
    return;
  }

  inputElement.setCustomValidity(errorMessage);

  inputElement.reportValidity();
};

/**
 *
 * @param baseDate : new Date().getTime()
 *
 * @returns `{nextDay}요일 ${month}/${date}`;
 */
export const getFormattedNextDay = (baseDate: number) => {
  const dayArray = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const nextDate = new Date(baseDate + 24 * 60 * 60 * 1000);

  const day = nextDate.getDay();
  const month = nextDate.getMonth() + 1;
  const date = nextDate.getDate();

  return `${dayArray[day]}요일 ${month}/${date}`;
};

export const getFormattedWon = (money: number) => {
  const formatter = new Intl.NumberFormat('ko', { notation: 'compact' });

  return formatter.format(money);
};

export const getFormattedPrice = (price: number) => {
  return price.toLocaleString('ko-KR');
};

interface GetPercentageNumberParams {
  total: number;
  percent: number;
}

export const getPercentageNumber = ({ total, percent }: GetPercentageNumberParams) => {
  if (total < 0) {
    console.error('총 가격이 음수일땐 안됩니다.');
    return null;
  }

  if (percent < 0) {
    console.error('퍼센트가 음수일땐 안됩니다.');
    return null;
  }

  if (percent >100 ) {
    console.error('퍼센트가 100 초과일땐 안됩니다.');
    return null;
  }

  return total * (percent / 100);
};
