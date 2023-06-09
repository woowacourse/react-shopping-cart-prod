export interface UserInformationType {
  email: string;
  password: string;
  nickname: string;
}

export const USER_INFORMATION: UserInformationType[] = [
  {
    email: 'pizza1@pizza.com',
    password: 'pizza',
    nickname: '토핑왕',
  },
  {
    email: 'pizza2@pizza.com',
    password: 'pizza',
    nickname: '치즈러버',
  },
];
