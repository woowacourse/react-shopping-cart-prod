export const MESSAGE = {
  notFound: {
    title: '페이지를 찾을 수 없습니다.',
    description: '페이지가 존재하지 않거나 삭제되어 찾을 수 없어요 🥲',
    imageSrc: `${process.env.PUBLIC_URL}/images/error.png`,
  },
  loading: {
    title: '로딩중입니다.',
    description: '잠시만 기다려주세요 😊',
    imageSrc: `${process.env.PUBLIC_URL}/images/loading.png`,
  },
} as const;

export type MessageKey = keyof typeof MESSAGE;

export const ERROR_MESSAGE = {
  product: {
    title: '상품을 가져오는데 실패했습니다.',
    description: '페이지를 새로고침 해주세요 😊',
  },
  cart: {
    title: '장바구니 목록을 가져오는데 실패했습니다.',
    description: '페이지를 새로고침 해주세요 😊',
  },
  order: {
    title: '주문 목록을 가져오는데 실패했습니다.',
    description: '페이지를 새로고침 해주세요 😊',
  },
  orderDetail: {
    title: '해당 주문을 가져오는데 실패했습니다.',
    description:
      '현재 존재하지 않는 주문일 수 있어요.\n주문 목록에서 확인해 주세요 😊',
  },
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGE;

export const EMPTY_MESSAGE = {
  product: {
    title: '현재 판매 중인 상품이 없습니다.',
    description: '문의 주시거나 상품이 추가될 때까지 조금만 기다려주세요 🥲',
  },
  cart: {
    title: '장바구니에 상품이 없습니다.',
    description: '상품을 추가해보세요 😊',
  },
  order: {
    title: '주문한 상품이 없습니다.',
    description: '상품을 주문해보세요 😊',
  },
} as const;

export type EmptyMessageKey = keyof typeof EMPTY_MESSAGE;
