export default class CustomError extends Error {
  code: number;
  statusCode: number;

  constructor(code: number, message: string, statusCode?: number, options?: ErrorOptions) {
    super(message, options);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.code = code;
    this.statusCode = statusCode;
  }
}
