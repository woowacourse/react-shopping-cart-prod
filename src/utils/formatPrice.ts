export const formatPrice = (price: number) => {
  return `₩ ${price.toLocaleString('ko-KR')}`;
};

export const formatPriceWithoutWon = (price: number) => {
  return `${price.toLocaleString('ko-KR')}`;
};
