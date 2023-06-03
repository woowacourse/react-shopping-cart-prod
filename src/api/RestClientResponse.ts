/* eslint-disable no-throw-literal */
import type { HttpResponse } from './rest/RestAPI';

// Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const OK_STATUS_CODES = [
  200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 307, 308,
] as const;

class RestClientResponse<TResponse extends HttpResponse = HttpResponse> {
  readonly response: TResponse;

  get data() {
    return this.response.data;
  }

  get headers() {
    return this.response.headers;
  }

  get statusCode() {
    return this.response.statusCode;
  }

  constructor(response: TResponse) {
    this.response = response;
  }

  private assertStatusCode<StatusCode extends TResponse['statusCode']>(
    response: TResponse,
    statusCodes: StatusCode | readonly [StatusCode, ...StatusCode[]],
  ): response is Extract<TResponse, { statusCode: StatusCode }> {
    return ((Array.isArray(statusCodes) ? statusCodes : [statusCodes]) as number[]).includes(
      response.statusCode,
    );
  }

  accept<StatusCode extends TResponse['statusCode']>(
    statusCodes: StatusCode | readonly [StatusCode, ...StatusCode[]],
  ): Extract<TResponse, { statusCode: StatusCode }> | null {
    const { response } = this;
    if (!this.assertStatusCode(response, statusCodes)) {
      return null;
    }
    return response;
  }

  acceptOrThrow<StatusCode extends TResponse['statusCode']>(
    statusCodes: StatusCode | readonly [StatusCode, ...StatusCode[]],
  ): Extract<TResponse, { statusCode: StatusCode }> {
    const { response } = this;
    if (!this.assertStatusCode(response, statusCodes)) {
      throw this;
    }
    return response;
  }

  acceptOkOrThrow() {
    return this.acceptOrThrow(OK_STATUS_CODES);
  }
}

export default RestClientResponse;
