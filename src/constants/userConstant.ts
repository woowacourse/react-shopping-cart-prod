export interface UserInformationType {
  id: string;
  password: string;
  nickname: string;
}

export const USER_INFORMATION: UserInformationType[] = [
  {
    id: 'pizza1@pizza.com',
    password: 'pizza',
    nickname: '토핑왕',
  },
  {
    id: 'pizza2@pizza.com',
    password: 'pizza',
    nickname: '치즈러버',
  },
];
