import { rest } from 'msw';

import { API_ENDPOINT, HTTP_STATUS_CODE } from '../../constants/api';
import { addOrder, getOrderListData, setOrderListData } from '../../domain/order';
import { PostOrderRequestBody } from '../../types/api';

const orderHandlers = [
  rest.post(API_ENDPOINT.ORDERS, async (req, res, ctx) => {
    const { cartItems } = await req.json<PostOrderRequestBody>();
    const currentOrderListData = getOrderListData();

    const newOrderList = addOrder(currentOrderListData, cartItems);

    setOrderListData(newOrderList);

    return res(
      ctx.status(HTTP_STATUS_CODE.CREATED),
      ctx.set('Location', `${API_ENDPOINT.ORDERS}/${newOrderList.at(-1)?.id}`)
    );
  }),
];

export { orderHandlers };
