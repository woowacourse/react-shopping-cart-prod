export type DuplicateKeys<
  T extends object,
  K extends string
> = K extends keyof T ? K : never;

export type ResolvedValue<T> = T extends Promise<infer U> ? U : T;
