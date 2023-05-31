import api from "apis";
import { Order } from "types/order";

const URL = '/orders'



export const getOrders = async (): Promise<Order[]> => {
  const fetchedData = await api.get<Order[]>(URL, { id: 'a@a.com', password: 1234 });
  const orders = fetchedData.data;
  return orders;
};

export const getOrder = async (orderId?: number): Promise<Order> => {
  const fetchedData = await api.get<Order>(`${URL}/${orderId}`, { id: 'a@a.com', password: 1234 });
  const order = fetchedData.data;
  return order;
};



// export const addCartProducts = async (user: any, productId: Product['id']): Promise<number> => {
//   const fetchedData = await api.post(URL, user, { productId });

//   const location = fetchedData.headers.get('Location');
//   if (!location) {
//     throw new Error(`장바구니 상품 추가 요청 성공시 반환되는 location이 없습니다.`);
//   }

//   const cartProductId = location.replace('/cart-items/', '');

//   return Number(cartProductId);
// };