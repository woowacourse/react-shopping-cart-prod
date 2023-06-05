const formatDateToKorean = (isoDateString: string) => {
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
