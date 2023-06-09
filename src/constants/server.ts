export const SERVER = {
  푸우: {
    url: process.env.REACT_APP_POOH_URL,
    id: process.env.REACT_APP_ID,
    password: process.env.REACT_APP_PASSWORD,
  },
  도치: {
    url: process.env.REACT_APP_DOCHI_URL,
    id: process.env.REACT_APP_ID,
    password: process.env.REACT_APP_PASSWORD,
  },
  엔초: {
    url: process.env.REACT_APP_ENCHO_URL,
    id: process.env.REACT_APP_ID,
    password: process.env.REACT_APP_PASSWORD,
  },
  황펭: {
    url: '',
    id: 'a',
    password: 'b',
  },
} as const;

export type ServerKey = keyof typeof SERVER;

export const SERVER_KEYS = Object.keys(SERVER);

export const isServerKey = (value: string): value is ServerKey =>
  value in SERVER;
