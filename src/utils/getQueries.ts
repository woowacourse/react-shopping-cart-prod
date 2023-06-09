import { getArrayMutationMethod } from './getArrayMutationMethod';

export const getQueries = <T extends string>(
  search: string,
  keyArr: Readonly<T[]>
) =>
  search
    .replace(/^\?/, '')
    .split('&')
    .reduce<Record<T, string>>((queries, keyValue, _, search) => {
      const [key, value] = keyValue.split('=');
      const includes = getArrayMutationMethod(keyArr, 'includes');

      if (!includes(key) || search.length !== keyArr.length)
        throw new Error('Invalid query');

      return { ...queries, [key]: value };
    }, Object.create(Object.prototype));
