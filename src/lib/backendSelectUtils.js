class ApiServer {
  #connectApi = '.';

  setApiServer(hostName) {
    this.#connectApi = `https://${hostName}`;
  }

  get currentApiServer() {
    return this.#connectApi;
  }
}

export default new ApiServer();
