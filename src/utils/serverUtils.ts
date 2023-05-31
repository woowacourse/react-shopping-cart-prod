import { ServerName } from 'types/ServerType';

export const USER_INFO = [
  { id: 1, username: 'pizza1@pizza.com', password: 'pizza' },
  { id: 2, username: 'pizza2@pizza.com', password: 'pizza' },
] as const;

export const SERVER_BY_CREW = {
  MSW: 'msw',
  마코: 'https://m4co.shop',
  허브: 'https://h3rb.shop',
  우가: 'https://wuga.shop',
} as const;

export const CREW_NAMES = Object.keys(SERVER_BY_CREW);

export const getServerURL = (serverName: ServerName) => {
  return SERVER_BY_CREW[serverName];
};

export const getCredential = (userId: number) => {
  const userInfo = USER_INFO.find((user) => user.id === userId);

  if (!userInfo) throw new Error('id에 맞는 user가 없어 credential을 만들 수 없습니다.');

  return btoa(`${userInfo.username}:${userInfo.password}`);
};
