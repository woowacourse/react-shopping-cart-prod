import { OrderData } from '../types/order';
import { priceFormatter } from '../utils/formatter';

const DEFAULT_MIN_COUNT = 1;
const DEFAULT_MAX_COUNT = 99;
const DEFAULT_STEP = 1;

const TOAST_SHOW_DURATION = 2000;

const PRODUCT_LIST_SKELETON_ITEM_LENGTH = 15;
const CART_LIST_SKELETON_ITEM_LENGTH = 5;

const ORDER_ITEM_DESCRIPTION_DATA = [
  {
    LABEL: '상품명',
    value: (information: OrderData) => {
      const mainName = information.orderedItems[0].product.name;
      const subName =
        information.orderedItems.length > 1 ? ` 외 ${information.orderedItems.length - 1}건` : '';

      return mainName + subName;
    },
  },
  {
    LABEL: '주문번호',
    value: (information: OrderData) => {
      return information.id;
    },
  },
  {
    LABEL: '결제금액',
    value: (information: OrderData) => {
      return `${priceFormatter(information.totalPrice)}원`;
    },
  },
] as const;

export {
  DEFAULT_MIN_COUNT,
  DEFAULT_MAX_COUNT,
  DEFAULT_STEP,
  TOAST_SHOW_DURATION,
  PRODUCT_LIST_SKELETON_ITEM_LENGTH,
  CART_LIST_SKELETON_ITEM_LENGTH,
  ORDER_ITEM_DESCRIPTION_DATA,
};
