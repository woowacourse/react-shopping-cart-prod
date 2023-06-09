export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

export const calculateSalePercentage = (
  originalPrice: number,
  salePrice: number
) => {
  return Math.floor((salePrice / originalPrice) * 100);
};
