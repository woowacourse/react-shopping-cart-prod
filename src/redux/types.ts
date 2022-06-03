import { Valueof } from 'types/utilities';

export type StatusType = 'success' | 'failure' | 'request';
export type ActionGroupType<T> = Valueof<T>;
export type ActionReturnType = {
  type: string;
  payload?: unknown;
};
// @TODO: T 제네릭 해결
export type ActionsType<T extends Record<StatusType, (...args: any[]) => ActionReturnType>> =
  ReturnType<T[StatusType]>;
