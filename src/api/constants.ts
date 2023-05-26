const username = "a@a.com";
const password = "1234";

export const USER_TOKEN = btoa(username + ":" + password);

export const SERVER_LIST = {
  "power-server": "https://power.better-than-coupang.kro.kr",
  "ttaengchil-server": "https://0chil.better-than-coupang.kro.kr",
  "ori-server": "https://duck.better-than-coupang.kro.kr",
} as const;
