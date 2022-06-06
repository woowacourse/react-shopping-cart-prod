export default class CustomError extends Error {
  code: number;

  constructor(code: number, message?: string, options?: ErrorOptions) {
    super(message, options);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.code = code;
  }
}
