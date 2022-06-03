export const SNACKBAR_MESSAGE = {
  addProduct: (title) => `장바구니에 ${title} 상품 추가!`,
  deleteProduct: (title) => `장바구니에 ${title} 상품 삭제!`,
  clearProduct: (title) => `장바구니에 ${title} 상품 완전 삭제!`,
  deletesProduct: () => `장바구니에 체크된 상품들 완전 삭제!`,
  successLogin: () => '로그인!',
  successUpdateUser: () => '프로필 수정이 완료!',
  withdrawUser: () => '회원 탈퇴 ㅠㅠ',
  noAuth: () => '권한이 없엉 ㅠㅠ',
  allReadyLogin: () => '이미 로그인 했엉!',
  signUpUser: () => '회원 가입!',
};

export const PAGING = {
  VIEW_COUNT: 10,
  GROUP: 5,
};

export const PATH = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT: '/product',
  CARTS: '/carts',
  LOGIN: '/login',
  SIGNUP: '/signUp',
  PROFILE: '/profile',
  PASSWORD: '/password',
  WITHDRAWAL: '/withdrawal',
};
