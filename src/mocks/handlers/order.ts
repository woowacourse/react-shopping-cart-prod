import { rest } from 'msw';

import { API_ENDPOINT, HTTP_STATUS_CODE } from '../../constants/api';
import { setCartData, updateCart } from '../../domain/cart';
import { seMemberData, updateMemberInformation } from '../../domain/member';
import { addOrder, getOrderListData, setOrderListData } from '../../domain/order';
import { PostOrderRequestBody } from '../../types/api';

const orderHandlers = [
  rest.post(API_ENDPOINT.ORDERS, async (req, res, ctx) => {
    const { cartItemIds, ...costs } = await req.json<PostOrderRequestBody>();
    const currentOrderListData = getOrderListData();

    const newOrderList = addOrder(cartItemIds, costs, currentOrderListData);

    if (!newOrderList) {
      return res(ctx.status(HTTP_STATUS_CODE.CONFLICT));
    }

    const newMemberInformation = updateMemberInformation(newOrderList);
    const newCartList = updateCart(cartItemIds);

    setOrderListData(newOrderList);
    seMemberData(newMemberInformation);
    setCartData(newCartList);

    return res(
      ctx.status(HTTP_STATUS_CODE.CREATED),
      ctx.set('Location', `${API_ENDPOINT.ORDERS}/${newOrderList.at(-1)?.id}`)
    );
  }),

  rest.get(API_ENDPOINT.ORDERS, async (req, res, ctx) => {
    const orderList = getOrderListData();

    return res(
      ctx.delay(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR),
      ctx.status(HTTP_STATUS_CODE.OK),
      ctx.json(orderList)
    );
  }),
];

export { orderHandlers };
