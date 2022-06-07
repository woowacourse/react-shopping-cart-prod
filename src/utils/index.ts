export const formatDecimal = (input: number) => {
  return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export const generateRandomCode = (n: number): string => {
  let code = '';

  for (let i = 0; i < n; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
};

export const isEmptyObject = (object: unknown) => {
  return Object.keys(object).length === 0;
};
