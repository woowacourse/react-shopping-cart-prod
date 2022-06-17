import LocalStorage from "./localStorage";

class AccessTokenStorage {
  static TOKEN_KEY = "accessToken";

  static get() {
    return LocalStorage.getItem(this.TOKEN_KEY);
  }

  static save(accessToken) {
    LocalStorage.setItem(this.TOKEN_KEY, accessToken);
  }

  static clear() {
    LocalStorage.removeItem(this.TOKEN_KEY);
  }
}

export default AccessTokenStorage;
