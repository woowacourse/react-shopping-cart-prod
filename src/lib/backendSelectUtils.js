class ApiServer {
  #connectApi = 'https://jojogreen.compy.life';

  setApiServer(hostName) {
    this.#connectApi = `https://${hostName}`;
  }

  get currentApiServer() {
    return this.#connectApi;
  }
}

export default new ApiServer();
