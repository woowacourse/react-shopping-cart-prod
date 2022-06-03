import localStorageKey from "./constants";

class LocalStorage {
  static db = null;

  static getInstance(key = localStorageKey) {
    if (this.db) return this.db;
    this.db = JSON.parse(window.localStorage.getItem(key) ?? "{}");
    return this.db;
  }

  static saveInstance(db, key = localStorageKey) {
    window.localStorage.setItem(key, JSON.stringify(db));
    this.db = db;
    return this.db;
  }

  static getItem(itemKey) {
    const db = this.getInstance();
    return db[itemKey];
  }

  static setItem(itemKey, value) {
    const db = this.getInstance();
    db[itemKey] = value;
    return this.saveInstance(db);
  }

  static removeItem(itemKey) {
    delete this.db[itemKey];
    LocalStorage.saveInstance(this.db);
  }
}

export function saveAccessToken(accessToken) {
  LocalStorage.setItem("accessToken", accessToken);
}

export default LocalStorage;
