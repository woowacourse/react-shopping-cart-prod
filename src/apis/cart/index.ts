import { CartPriceInfo, CartProduct, CartProducts, Product } from 'types/product';
import api from 'apis';

const URL = '/cart-items';

type ServerCartProduct = {
  id: number;
  quantity: number;
  product: Product;
};

const isServerCartProductsType = (data: any): data is ServerCartProduct[] => {
  if (!Array.isArray(data)) return false;

  const hasCorrectKeys = data.every((value) => 'id' in value && 'quantity' in value && 'product' in value);

  return hasCorrectKeys;
};

const cartProductsParser = (data: any): CartProducts => {
  if (!isServerCartProductsType(data)) throw new Error(`서버 데이터 형식이 serverCartProducts type이 아닙니다.`);

  const parsedCartProducts = data.map(({ id, product, quantity }) => [id, { quantity, product }] as const);

  return new Map(parsedCartProducts);
};

export const getCartProducts = async (): Promise<CartProducts> => {
  const { data: cartProducts } = await api.get<ServerCartProduct[]>(URL);

  return cartProductsParser(cartProducts);
};

export const postCartProducts = async (productId: Product['id']): Promise<number> => {
  const { headers } = await api.post(URL, { productId });

  const location = headers.get('Location');
  if (!location) {
    throw new Error(`장바구니 상품 추가 요청 성공시 반환되는 location이 없습니다.`);
  }

  const cartProductId = location.replace('/cart-items/', '');

  return Number(cartProductId);
};

export const updateCartProductsQuantity = async (quantity: CartProduct['quantity'], cartProductId: number) => {
  await api.patch(`${URL}/${cartProductId}`, { quantity });
};

export const removeCartProduct = async (cartProductIds: number[]) => {
  await api.remove(URL, { cartItemIds: cartProductIds });
};

export const getCartPriceInfo = async (checkedCartProductIds: number[]): Promise<CartPriceInfo> => {
  const params = new URLSearchParams();
  checkedCartProductIds.forEach((id) => params.append('item', `${id}`));

  const { data: cartPriceInfo } = await api.get<CartPriceInfo>(`${URL}/price?${params.toString()}`);

  return cartPriceInfo;
};
