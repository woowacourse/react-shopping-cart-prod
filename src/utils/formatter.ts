const priceFormatter = (price: number) => {
  return price === 0 ? 0 : price.toLocaleString();
};

const dateFormatter = (date: string) => {
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(new Date(date));
};

const timeFormatter = (time: string) => {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    timeStyle: 'long',
    hour12: false,
  });

  return formatter.format(new Date(time)).replace(/(분).*$/, '$1');
};

export { priceFormatter, dateFormatter, timeFormatter };
