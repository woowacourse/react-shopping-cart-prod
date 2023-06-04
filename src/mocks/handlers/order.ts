import { rest } from 'msw';

import { API_ENDPOINT, HTTP_STATUS_CODE } from '../../constants/api';
import productListData from '../../data/mockData.json';
import { getCartData } from '../../domain/cart';
import { getOrderListData, setOrderListData } from '../../domain/order';
import type { CartItemData, OrderData, OrderedItemData } from '../../types';
import { PostOrdersRequestBody } from '../../types/api';
import {
  getDiscountedTotalItemPrice,
  getShippingFee,
  getTotalItemDiscountAmount,
  getTotalItemPrice,
  getTotalMemberDiscountAmount,
  getTotalPrice,
} from '../utils';

const orderHandlers = [
  // 장바구니 상품 주문 요청
  rest.post(API_ENDPOINT.ORDERS, async (req, res, ctx) => {
    const orderData = await req.json<PostOrdersRequestBody>();
    console.log('msw', orderData);
    const orderedItemList: OrderedItemData[] = orderData.cartItemIds.map((cartItemId) => {
      const cartItem = getCartData().find((cartItem) => cartItem.id === cartItemId)!;
      const product = cartItem.product;

      return {
        quantity: cartItem.quantity, // cartItemId로 quantity 알 수 있지 않나?
        ...product,
      };
    });

    const newOrderId = Number(new Date().toISOString());

    const newOrderData: OrderData = {
      id: newOrderId,
      orderedItems: orderedItemList,
      orderedAt: new Date(),
      totalItemDiscountAmount: getTotalItemDiscountAmount(orderedItemList),
      totalMemberDiscountAmount: getTotalMemberDiscountAmount(orderedItemList),
      totalItemPrice: getTotalItemPrice(orderedItemList),
      discountedTotalItemPrice: getDiscountedTotalItemPrice(orderedItemList),
      shippingFee: getShippingFee(orderedItemList),
      totalPrice: getTotalPrice(orderedItemList),
    };

    setOrderListData([...getOrderListData(), newOrderData]); // 사용자 로그인 제외: mock이니까 사용자별 주문 저장x

    return res(
      ctx.delay(500),
      ctx.status(HTTP_STATUS_CODE.CREATED),
      ctx.set('Location', `${API_ENDPOINT.ORDERS}/${newOrderId}`),
      ctx.json(productListData)
    );
  }),

  // 사용자 별 주문 전체 목록
  rest.get(API_ENDPOINT.ORDERS, (req, res, ctx) => {
    const { memberId } = req.params;

    const orderList = getOrderListData();

    return res(ctx.status(HTTP_STATUS_CODE.OK), ctx.json(orderList));
  }),

  // 특정 주문의 상세 정보 확인
  rest.get(`${API_ENDPOINT.ORDERS}/:orderId`, (req, res, ctx) => {
    const { memberId, orderId } = req.params;

    const orderList = getOrderListData();

    const order = orderList.find((order) => order.id === Number(orderId));

    return res(ctx.status(HTTP_STATUS_CODE.OK), ctx.json(order));
  }),

  // 멤버 등급 조회
  rest.get(`/member`, (req, res, ctx) => {
    return res(ctx.status(HTTP_STATUS_CODE.OK));
  }),
];

export { orderHandlers };
