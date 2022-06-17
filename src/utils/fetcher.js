class Fetcher {
  // eslint-disable-next-line no-undef
  static BASE_URL = API_URL;

  static getHeadersWithAccessToken = (accessToken) => {
    const headers = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {};
    return headers;
  };

  static get = ({ endpoint, accessToken }) => {
    return fetch(`${this.BASE_URL}/${endpoint}`, {
      headers: { ...this.getHeadersWithAccessToken(accessToken) },
    });
  };

  static post = ({ endpoint, body, accessToken }) => {
    const headers = {
      ...this.getHeadersWithAccessToken(accessToken),
      "Content-Type": "application/json",
    };
    return fetch(`${this.BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { ...headers },
      body: JSON.stringify(body),
    });
  };

  static patch = ({ endpoint, body, accessToken }) => {
    const headers = {
      ...this.getHeadersWithAccessToken(accessToken),
      "Content-Type": "application/json",
    };
    return fetch(`${this.BASE_URL}/${endpoint}`, {
      method: "PATCH",
      headers: { ...headers },
      body: JSON.stringify(body),
    });
  };

  static delete = ({ endpoint, body, accessToken }) => {
    const headers = {
      ...this.getHeadersWithAccessToken(accessToken),
      "Content-Type": "application/json",
    };
    return fetch(`${this.BASE_URL}/${endpoint}`, {
      method: "DELETE",
      headers: { ...headers },
      body: JSON.stringify(body),
    });
  };
}

export default Fetcher;
