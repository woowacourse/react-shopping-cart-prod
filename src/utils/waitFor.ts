import { FetchQueryRes } from '../apis/api.type';
import { ERROR_CODE } from '../constants/errors';
import { ResolvedValue } from '../types/common';
import { CustomError } from '../validation/errors';

export interface WaitForOptions<T> {
  onSuccess?(data: ResolvedValue<FetchQueryRes<T>>): void;
  onError?(error: unknown): void;
}
export interface WaitForMutationOptions<T, P> {
  onSuccess?(param: P, data: ResolvedValue<FetchQueryRes<T>>): void;
  onError?(error: unknown): void;
}

export const waitFor = async <T>(
  promise: FetchQueryRes<T>,
  options?: WaitForOptions<T>
): FetchQueryRes<T> => {
  try {
    const data = await promise;
    options?.onSuccess?.(data);
    return data;
  } catch (error) {
    options?.onError?.(error);

    if (error instanceof CustomError) throw error;

    throw new CustomError({ code: ERROR_CODE.UNEXPECTED_ERROR });
  }
};

export const waitForMutation =
  <T, P = void>(
    promise: (param: P) => FetchQueryRes<T>,
    options?: WaitForMutationOptions<T, P>
  ) =>
  (param: P) =>
    waitFor(promise(param), {
      ...options,
      onSuccess: options?.onSuccess?.bind(options.onSuccess, param),
    });
