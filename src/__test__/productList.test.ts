import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import { productListApiWrapper } from '@utils/productList/productList';

const [product] = MOCK_PRODUCT_LIST;

describe('상품 목록 함수 테스트', () => {
  test('서버에서 받아온 상품 목록을 클라이언트에서 사용하는 상품 목록으로 변경하는 기능이 올바르게 작동하는 지 테스트', () => {
    const productList = [product];

    const result = productListApiWrapper(productList);

    expect(result).toEqual([
      {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
    ]);
  });
});
