import { getLocalStorage } from "../utils";
import {
  DEFAULT_VALUE_LOGIN_TOKEN,
  DEFAULT_VALUE_SERVER_OWNER,
  KEY_LOCALSTORAGE_LOGIN_TOKEN,
  KEY_LOCALSTORAGE_SERVER_OWNER,
  SERVERS,
} from "../constants";

export const api = {
  get: (path: string, isAuthRequired?: boolean) => {
    return isAuthRequired
      ? fetch(
          `${
            SERVERS[
              getLocalStorage(
                KEY_LOCALSTORAGE_SERVER_OWNER,
                DEFAULT_VALUE_SERVER_OWNER
              )
            ]
          }${path}`,
          isAuthRequired && {
            headers: {
              Authorization: `Basic ${getLocalStorage(
                KEY_LOCALSTORAGE_LOGIN_TOKEN,
                DEFAULT_VALUE_LOGIN_TOKEN
              )}`,
            },
          }
        )
      : fetch(
          `${
            SERVERS[
              getLocalStorage(
                KEY_LOCALSTORAGE_SERVER_OWNER,
                DEFAULT_VALUE_SERVER_OWNER
              )
            ]
          }${path}`
        );
  },

  patch: <T>(path: string, payload?: T) =>
    fetch(
      `${
        SERVERS[
          getLocalStorage(
            KEY_LOCALSTORAGE_SERVER_OWNER,
            DEFAULT_VALUE_SERVER_OWNER
          )
        ]
      }${path}`,
      {
        headers: {
          Authorization: `Basic ${getLocalStorage(
            KEY_LOCALSTORAGE_LOGIN_TOKEN,
            DEFAULT_VALUE_LOGIN_TOKEN
          )}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    ),

  post: <T>(path: string, payload?: T) => {
    return fetch(
      `${
        SERVERS[
          getLocalStorage(
            KEY_LOCALSTORAGE_SERVER_OWNER,
            DEFAULT_VALUE_SERVER_OWNER
          )
        ]
      }${path}`,
      {
        headers: {
          Authorization: `Basic ${getLocalStorage(
            KEY_LOCALSTORAGE_LOGIN_TOKEN,
            DEFAULT_VALUE_LOGIN_TOKEN
          )}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },

  delete: (path: string) =>
    fetch(
      `${
        SERVERS[
          getLocalStorage(
            KEY_LOCALSTORAGE_SERVER_OWNER,
            DEFAULT_VALUE_SERVER_OWNER
          )
        ]
      }${path}`,
      {
        headers: {
          Authorization: `Basic ${getLocalStorage(
            KEY_LOCALSTORAGE_LOGIN_TOKEN,
            DEFAULT_VALUE_LOGIN_TOKEN
          )}`,
        },
        method: "DELETE",
      }
    ),
};
