export default class ErrorResponse extends Error {
  code: number;
  statusCode: number;

  constructor(code: number, message: string, statusCode?: number, options?: ErrorOptions) {
    super(message, options);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorResponse);
    }

    this.code = code;
    this.statusCode = statusCode;
  }
}
