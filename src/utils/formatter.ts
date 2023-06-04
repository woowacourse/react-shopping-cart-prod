const priceFormatter = (price: number, displayNegative?: boolean) => {
  const formattedPrice = price.toLocaleString();

  if (formattedPrice === '0') return `${formattedPrice}원`;

  return displayNegative ? `-${formattedPrice}원` : `${formattedPrice}원`;
};

const YYYYMMDDFormatter = (date: Date) => {
  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');

  return year + '.' + month + '.' + day;
};

const HHMMFormatter = (date: Date) => {
  const formattedDate = new Date(date);

  const hours = String(formattedDate.getHours()).padStart(2, '0');
  const minutes = String(formattedDate.getMinutes()).padStart(2, '0');

  return `${hours}시 ${minutes}분`;
};

export { priceFormatter, YYYYMMDDFormatter, HHMMFormatter };
