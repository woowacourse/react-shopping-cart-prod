const priceFormatter = (price: number, displayNegative?: boolean) => {
  const formattedPrice = price.toLocaleString();

  if (formattedPrice === '0') return `${formattedPrice}원`;

  return displayNegative ? `-${formattedPrice}원` : `${formattedPrice}원`;
};

const dateFormatter = (date: Date, style: 'YYYYMMDD' | 'HHMMSS') => {
  switch (style) {
    case 'YYYYMMDD':
      return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(new Date(date));
    case 'HHMMSS':
      return new Intl.DateTimeFormat('ko-KR', { timeStyle: 'medium' }).format(new Date(date));
  }
};

export { priceFormatter, dateFormatter };
