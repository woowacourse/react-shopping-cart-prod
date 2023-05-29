const dateHelper = {
  changeLocalDate: (date: Date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const today = new Date(date).getDate();

    return `${year}년 ${month}월 ${today}일`;
  },
};

export default dateHelper;
