import { renderHook, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { rest } from 'msw';
import { RecoilRoot } from 'recoil';
import { useProductListReadOnly } from '@hooks/recoil/productList/useProductListReadOnly';
import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import { SERVER_NAME, getProductPath } from '@constants/serverUrlConstants';
import { server } from '../setupTests';

fetchMock.enableMocks();

const fetchUrl = getProductPath(SERVER_NAME[0]);

describe('Recoil의 selector을 이용하여 상품 목록을 올바르게 불러오는 지 테스트', () => {
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
    const { result } = renderHook(() => useProductListReadOnly(), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      setTimeout(() => {
        const productList = result.current;

        const keys = Object.keys(productList);

        expect(keys).toEqual(['id', 'name', 'price', 'imageUrl']);
      }, 1000);
    });
  });
});
