class ApiServer {
  #connectApi = process.env.REACT_APP_API_URL;

  setApiServer(hostName) {
    this.#connectApi = `https://${hostName}`;
  }

  get currentApiServer() {
    return this.#connectApi;
  }
}

export default new ApiServer();
