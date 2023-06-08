const convert = {
  toLocalPriceFromNumber: (number: number) => `${number.toLocaleString()} 원`,

  toNumberFromLocalPrice: (localPrice: string) => Number(localPrice.replace(/,|원|\s/g, '')),
};

export default convert;
