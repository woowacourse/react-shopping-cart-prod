const priceFormatter = (price: number, displayNegative?: boolean) => {
  const formattedPrice = price.toLocaleString();

  if (formattedPrice === '0') return `${formattedPrice}원`;

  return displayNegative ? `-${formattedPrice}원` : `${formattedPrice}원`;
};

export { priceFormatter };
