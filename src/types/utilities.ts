export type Valueof<T> = T[keyof T];

export type PartialRequired<T, K extends keyof T> = T & {
  [Key in K]-?: T[Key];
};
