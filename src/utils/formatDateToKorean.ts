const isIsoDate = (isoDateString: string) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(isoDateString);

const formatDateToKorean = (isoDateString: string) => {
  if (!isIsoDate) {
    return '날짜 정보를 확인할 수 없습니다.';
  }

  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  return formattedDate;
};

export default formatDateToKorean;
