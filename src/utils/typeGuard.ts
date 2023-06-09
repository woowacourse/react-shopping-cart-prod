import { HTTP_ERROR_MESSAGE } from '../constants/api';
import type { HTTPErrorMessageCode } from '../types/api';
import type { CartItemData } from '../types/cart';
import type { OrderedItemData } from '../types/order';

function isHTTPErrorMessageCodeType(value: any): value is HTTPErrorMessageCode {
  return Object.keys(HTTP_ERROR_MESSAGE).includes(value);
}

const isCartItemData = (data: CartItemData | OrderedItemData): data is CartItemData => {
  return (data as CartItemData).product !== undefined;
};

export { isHTTPErrorMessageCodeType, isCartItemData };
