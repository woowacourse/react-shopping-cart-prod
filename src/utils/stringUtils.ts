export const removeChar = (target: string, char: string) => {
  return target.split(char).reduce((acc, cur) => acc + cur);
};
