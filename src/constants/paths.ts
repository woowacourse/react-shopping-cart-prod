import { Step } from '../components/Stepper/Stepper.types';

const PATHS = {
  INDEX: '/',
  PRODUCT: '/product/:id',
  CART: '/cart',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  PROFILE: '/profile',
  DEFAULT: '*',
} as const;

const SIGNUP_STEPS: {
  [key: string]: Step;
} = {
  TERMS: {
    id: 1,
    title: '약관 동의',
  },
  FILL_INFO: {
    id: 2,
    title: '정보 입력',
  },
  RESULT: {
    id: 3,
    title: '가입 완료',
  },
} as const;

const SIGNUP_STEPS_LIST = [
  SIGNUP_STEPS.TERMS,
  SIGNUP_STEPS.FILL_INFO,
  SIGNUP_STEPS.RESULT,
];

export { PATHS, SIGNUP_STEPS, SIGNUP_STEPS_LIST };
