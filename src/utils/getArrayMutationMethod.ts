export const getArrayMutationMethod = <T extends Readonly<unknown[]>>(
  arr: T,
  method: keyof T
) => {
  switch (method) {
    case 'includes':
      return (arg: unknown): arg is T[number] => arr.includes(arg);
    default:
      throw new Error('Invalid method');
  }
};
