const PATHS = {
  INDEX: '/',
  PRODUCT: '/product/:id',
  CART: '/cart',
  SIGNUP: '/signup/:stepId',
  SIGNIN: '/signin',
  PROFILE: '/profile',
  DEFAULT: '*',
} as const;

const SIGNUP_STEPS: { title: string; id: number }[] = [
  { title: '약관 동의', id: 1 },
  { title: '정보 입력', id: 2 },
  { title: '가입 완료', id: 3 },
];

export { PATHS, SIGNUP_STEPS };
