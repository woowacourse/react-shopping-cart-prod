const priceFormatter = (price: number) => {
  return price.toLocaleString();
};

const dateFormatter = (createdAt: Date) => {
  return new Date(createdAt).toLocaleDateString('sv').replaceAll('-', '.');
};

export { priceFormatter, dateFormatter };
