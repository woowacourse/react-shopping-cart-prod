import LocalStorage from "@storage/localStorage";

class Fetcher {
  // eslint-disable-next-line no-undef
  static BASE_URL = API_URL;

  static accessToken = LocalStorage.getItem("accessToken");

  static updateAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  static getHeadersWithAccessToken = () => {
    const headers = this.accessToken
      ? {
          Authorization: `Bearer ${this.accessToken}`,
        }
      : {};
    return headers;
  };

  static get = (endpoint) => {
    return fetch(`${this.BASE_URL}/${endpoint}`, {
      headers: { ...this.getHeadersWithAccessToken() },
    });
  };

  static post = (endpoint, body) => {
    const headers = {
      ...this.getHeadersWithAccessToken(),
      "Content-Type": "application/json",
    };
    return fetch(`${this.BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { ...headers },
      body: JSON.stringify(body),
    });
  };

  static patch = (endpoint, body) => {
    const headers = {
      ...this.getHeadersWithAccessToken(),
      "Content-Type": "application/json",
    };
    return fetch(`${this.BASE_URL}/${endpoint}`, {
      method: "PATCH",
      headers: { ...headers },
      body: JSON.stringify(body),
    });
  };

  static delete = (endpoint, body) => {
    const headers = {
      ...this.getHeadersWithAccessToken(),
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
