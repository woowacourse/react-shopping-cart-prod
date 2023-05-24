export const SERVER = {
  도치: {
    url: process.env.REACT_APP_DOCHI_URL,
    id: process.env.REACT_APP_ID,
    password: process.env.REACT_APP_PASSWORD,
  },
  푸우: {
    url: process.env.REACT_APP_POOH_URL,
    id: process.env.REACT_APP_ID,
    password: process.env.REACT_APP_PASSWORD,
  },
  엔초: {
    url: process.env.REACT_APP_ENCHO_URL,
    id: process.env.REACT_APP_ID,
    password: process.env.REACT_APP_PASSWORD,
  },
} as const;

export const SERVER_KEYS = Object.keys(SERVER);

export type ServerKey = keyof typeof SERVER;

export const isServerKey = (value: unknown): value is ServerKey => {
  const serverKey = value as ServerKey;

  return serverKey in SERVER;
};
