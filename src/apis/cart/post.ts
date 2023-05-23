import fetcher from 'apis';
import { Product } from 'types/product';

const POST_URL = '/cart-items';

export const addCartProducts = async (productId: Product['id']): Promise<number> => {
  const fetchedData = await fetcher(POST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic bob:486`,
    },
    body: JSON.stringify({ productId }),
  });

  const location = fetchedData.headers.get('Location');
  if (!location) {
    throw new Error(`장바구니 상품 추가 요청 성공시 반환되는 location이 없습니다.`);
  }

  const cartProductId = location.replace('/cart-items/', '');

  return Number(cartProductId);
};
