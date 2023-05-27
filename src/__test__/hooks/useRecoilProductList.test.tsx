import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../setupTests';
import { rest } from 'msw';
import useRecoilProductList from '@hooks/useRecoilProductList';
import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import { SERVER_NAME, getProductPath } from '@constants/urlConstants';
import { RecoilRoot } from 'recoil';

const fetchUrl = getProductPath(SERVER_NAME[0]);

describe('API 변경에 유연하도록 구현한 useRecoilProductList API 레이어가 올바르게 기능하는 지 테스트', () => {
  beforeEach(() => {
    server.use(
      rest.get(fetchUrl, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(MOCK_PRODUCT_LIST)
        );
      })
    );
  });

  test('프론트엔드에서 의도한 API 레이어가 올바르게 기능하는 지 테스트', async () => {
    const { result } = renderHook(() => useRecoilProductList(), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      setTimeout(() => {
        const { productList } = result.current;

        const keys = Object.keys(productList ? productList[0] : []);

        expect(keys).toEqual(['id', 'name', 'price', 'imageUrl']);
      }, 1000);
    });
  });
});
