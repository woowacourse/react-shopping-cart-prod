export const toKoreanDate = (timeString: string) => {
  const dateString = timeString.split(' ')[0];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
