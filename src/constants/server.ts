export const SERVER = {
  도치: {
    url: 'http://13.209.67.114:8080',
  },
  푸우: {
    url: 'http://43.201.10.4:8080',
  },
  엔초: {
    url: 'http://13.124.236.192:8080',
  },
} as const;

export type ServerKey = keyof typeof SERVER;
