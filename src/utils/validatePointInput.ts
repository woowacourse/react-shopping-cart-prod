const removeComma = (input: string) => {
  return input.replace(',', '');
};

export const validatePointInput = (input: string, totalPrice: number, point: number) => {
  const parsedInput = Number(removeComma(input));

  if (parsedInput > point) return false;

  if (parsedInput > totalPrice) return false;

  return true;
};
