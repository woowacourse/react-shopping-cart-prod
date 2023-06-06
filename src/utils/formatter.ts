const priceFormatter = (price: number) => {
  return price === 0 ? 0 : price.toLocaleString();
};

const dateFormatter = (createdAt: Date) => {
  return createdAt.toLocaleDateString('sv').replaceAll('-', '.');
};

const timeFormatter = (createdAt: Date) => {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}시 ${minutes}분`;
};

export { priceFormatter, dateFormatter, timeFormatter };
