import { OrderData } from '../types';
import { priceFormatter } from '../utils/formatter';

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
      return `${priceFormatter(information.discountedTotalPrice)}원`;
    },
  },
] as const;

export { ORDER_ITEM_DESCRIPTION_DATA };
