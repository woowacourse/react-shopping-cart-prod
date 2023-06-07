export const formatPrice = (price: number) => {
  return `₩ ${price.toLocaleString('ko-KR')}`;
};
