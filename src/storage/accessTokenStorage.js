class AccessTokenStorage {
  static TOKEN_KEY = "accessToken";

  static _storage = null;

  static get storage() {
    return this._storage;
  }

  static set storage(newVal) {
    if (!(newVal instanceof Object)) {
      throw new Error("Storage should be Object");
    }
    const methods = ["getItem", "setItem", "removeItem"];
    const missingRequiredMethods = methods.some(
      (method) => !Object.prototype.hasOwnProperty.call(newVal, method)
    );
    if (missingRequiredMethods) {
      throw new Error("Storage should have required methods");
    }
    if (this._storage) {
      throw new Error("Storage should not be reassigned");
    }

    this._storage = newVal;
  }

  static get() {
    return this._storage.getItem(this.TOKEN_KEY);
  }

  static save(accessToken) {
    this._storage.setItem(this.TOKEN_KEY, accessToken);
  }

  static clear() {
    this._storage.removeItem(this.TOKEN_KEY);
  }
}

export default AccessTokenStorage;
