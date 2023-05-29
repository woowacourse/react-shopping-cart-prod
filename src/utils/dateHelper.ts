const dateHelper = {
  changeLocalDate: (date: Date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const today = new Date(date).getDate();
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    return `${year}년 ${month}월 ${today}일 ${hour}시 ${minutes}분`;
  },
};

export default dateHelper;
