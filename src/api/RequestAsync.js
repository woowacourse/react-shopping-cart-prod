import { 비동기_요청 } from 'constants/';

const errorReturn = (error) => ({
  status: 비동기_요청.FAIL,
  content: `서버와의 통신에 실패하였습니다. (${error.message})`,
});

const authorizedHeader = (header) => ({
  ...header,
  Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
});

class RequestAsync {
  constructor() {
    this.HOST_NAME = process.env.REACT_APP_API_URL;
    this.header = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  }

  async #getRefinedResponse(response) {
    const responseString = await response.text();

    return {
      status: response.ok ? 비동기_요청.SUCCESS : 비동기_요청.FAILURE,
      statusCode: response.status,
      content: responseString ? JSON.parse(responseString) : {},
    };
  }

  async get(path, authorize = false) {
    try {
      const response = await fetch(`${this.HOST_NAME}/${path}`, {
        method: 'GET',
        headers: authorize ? authorizedHeader(this.header) : this.header,
      });

      return this.#getRefinedResponse(response);
    } catch (error) {
      return errorReturn(error);
    }
  }

  async post(path, bodyData, authorize = false) {
    try {
      const response = await fetch(`${this.HOST_NAME}/${path}`, {
        method: 'POST',
        headers: authorize ? authorizedHeader(this.header) : this.header,
        body: JSON.stringify(bodyData),
      });

      return this.#getRefinedResponse(response);
    } catch (error) {
      return errorReturn(error);
    }
  }

  async put(path, bodyData, authorize = false) {
    try {
      const response = await fetch(`${this.HOST_NAME}/${path}`, {
        method: 'PUT',
        headers: authorize ? authorizedHeader(this.header) : this.header,
        body: JSON.stringify(bodyData),
      });

      return this.#getRefinedResponse(response);
    } catch (error) {
      return errorReturn(error);
    }
  }

  async delete(path, bodyData, authorize = false) {
    try {
      const response = await fetch(`${this.HOST_NAME}/${path}`, {
        method: 'DELETE',
        headers: authorize ? authorizedHeader(this.header) : this.header,
        body: JSON.stringify(bodyData),
      });

      return this.#getRefinedResponse(response);
    } catch (error) {
      return errorReturn(error);
    }
  }
}

const requestAsync = new RequestAsync();
export default requestAsync;
