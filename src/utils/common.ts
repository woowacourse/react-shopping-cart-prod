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
