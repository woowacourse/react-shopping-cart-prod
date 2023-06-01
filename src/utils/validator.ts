const isNumber = (inputValue: string) => {
  return /^[0-9]*$/.test(inputValue);
};

const areObjectsEqual = <T extends Record<string, unknown>>(obj1: T, obj2: T): boolean => {
  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => obj1[key] === obj2[key]);
};

export { isNumber, areObjectsEqual };
