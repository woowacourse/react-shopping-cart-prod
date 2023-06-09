import fetchMock from 'jest-fetch-mock';
import { rest } from 'msw';
import { MOCK_COUPON_LIST, MOCK_ORDER_LIST } from '@mocks/handlers';
import { getOrderDetailApi, getOrderListApi, submitOrderApi } from '@utils/order/fetchOrder';
import { SERVER_NAME, getOrderPath } from '@constants/serverUrlConstants';
import { UserInformationType } from '@constants/userConstant';
import { OrderType } from '@type/orderType';
import { server } from './setupTests';

fetchMock.enableMocks();

const fetchUrl = getOrderPath(SERVER_NAME[0]);

const SUCCESS = 'success';
const FAIL = 'fail';

const userInfo: UserInformationType = {
  nickname: '테스트',
  email: 'qweqwe@asdasd.com',
  password: 'asdasdasd',
};

describe('주문할 때 통신이 올바르게 작동하는 지 확인한다.', () => {
  const serverData: OrderType[] = MOCK_ORDER_LIST;
  let postResult = FAIL;

  beforeEach(() => {
    server.use(
      rest.get(fetchUrl, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(serverData)
        );
      }),

      rest.get(`${fetchUrl}/:orderId`, (req, res, ctx) => {
        const { orderId } = req.params;

        const orderItem = serverData.find((item) => item.id === Number(orderId));

        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(orderItem)
        );
      }),

      rest.post(fetchUrl, async (req, res, ctx) => {
        postResult = SUCCESS;
        return res(ctx.status(201));
      })
    );
  });

  test('주문 내역 목록을 불러온다.', async () => {
    const orders = await getOrderListApi({ serverName: SERVER_NAME[0], userInfo });

    expect(orders).toEqual(serverData);
  });

  test('주문 상세 내역을 불러온다.', async () => {
    const order = await getOrderDetailApi({
      serverName: SERVER_NAME[0],
      orderId: serverData[0].id,
      userInfo,
    });

    expect(order).toEqual(serverData[0]);
  });

  test('선택된 장바구니 아이템들과 쿠폰 아이디로 주문을 한다.', async () => {
    const cartItemIds = [1, 2];

    const selectedCoupon = MOCK_COUPON_LIST[0];

    await submitOrderApi({
      serverName: SERVER_NAME[0],
      cartItemIds,
      couponId: selectedCoupon.id,
      userInfo,
    });

    expect(postResult).toBe(SUCCESS);
  });

  test('선택된 장바구니 아이템들과 쿠폰을 선택하지 않고 주문을 한다.', async () => {
    const cartItemIds = [1, 2];

    await submitOrderApi({
      serverName: SERVER_NAME[0],
      cartItemIds,
      userInfo,
    });

    expect(postResult).toBe(SUCCESS);
  });
});
