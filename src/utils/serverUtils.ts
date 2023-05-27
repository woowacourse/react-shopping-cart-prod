interface ServerByCrewType {
  [name: string]: {
    url: string;
    user: { id: number; username: string; password: string }[];
  };
}

export const SERVER_BY_CREW: ServerByCrewType = {
  마코: {
    url: 'https://m4co.shop',
    user: [
      { id: 1, username: 'pizza1@pizza.com', password: 'pizza' },
      { id: 2, username: 'pizza2@pizza.com', password: 'pizza' },
    ],
  },
  허브: {
    url: 'https://h3rb.shop',
    user: [
      { id: 1, username: 'pizza1@pizza.com', password: 'pizza' },
      { id: 2, username: 'pizza2@pizza.com', password: 'pizza' },
    ],
  },
  우가: {
    url: 'https://wuga.shop',
    user: [
      { id: 1, username: 'pizza1@pizza.com', password: 'pizza' },
      { id: 2, username: 'pizza2@pizza.com', password: 'pizza' },
    ],
  },
};

export type CrewName = keyof typeof SERVER_BY_CREW;

export const getServerURL = (crew: CrewName) => {
  return SERVER_BY_CREW[crew].url;
};

export const getCredential = (crew: CrewName, userId: number) => {
  console.log('>>> crew, userId:', crew, userId);
  const users = SERVER_BY_CREW[crew].user;

  const targetUser = users.find((user) => user.id === userId);

  console.log('>>> targetUser:', targetUser);

  if (!targetUser) throw new Error(`id에 해당하는 user가 존재하지 않습니다.`);

  const { username, password } = targetUser;

  return btoa(`${username}:${password}`);
};
