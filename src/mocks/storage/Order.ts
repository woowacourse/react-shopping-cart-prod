import type { OrderInfo } from '../../types/order';
import type { CartProduct } from '../../types/product';
import Cart from './Cart';
import UserCoupon from './UserCoupon';

const KEY = 'MSW_ORDER_STEP2';

interface OrderRequestForm {
  cartItems: CartProduct[];
  couponIds: number[];
  deliveryFee: number;
}

const isSameCartProduct = (one: CartProduct, other: CartProduct) => {
  if (one.id !== other.id) return false;
  if (one.quantity !== other.quantity) return false;
  if (one.product.id !== other.product.id) return false;
  if (one.product.name !== other.product.name) return false;
  if (one.product.price !== other.product.price) return false;
  if (one.product.imageUrl !== other.product.imageUrl) return false;
  return true;
};

const getAllOrderList = (): { orders: OrderInfo[] } => {
  const storageData = localStorage.getItem(KEY);
  return storageData ? JSON.parse(storageData) : { orders: [] };
};

const getOrderList = (orderId: number) => {
  const { orders } = getAllOrderList();
  return orders.find(({ id }) => id === orderId);
};

/*
  주문 성공 시 주문번호를, 실패 시 -1을 반환.
*/
const request = ({ cartItems: userCart, couponIds, deliveryFee }: OrderRequestForm) => {
  const serverCart = Cart.getList();
  const { coupons: serverUserCoupons } = UserCoupon.getAll();
  const serverUserCouponIds = serverUserCoupons.map(({ id }) => id);

  if (!userCart.length) return -1;

  // 쿠폰 검증
  const isValidCouponIds = couponIds.every((id) => serverUserCouponIds.includes(id));
  if (!isValidCouponIds) return -1;

  // 장바구니 검증
  const orderingProducts: CartProduct[] = [];
  userCart.forEach((userCartProduct) => {
    const serverCartProduct = serverCart.find(({ id }) => id === userCartProduct.id);

    if (!serverCartProduct) return;
    if (!isSameCartProduct(userCartProduct, serverCartProduct)) return;

    orderingProducts.push(serverCartProduct);
  });

  if (orderingProducts.length !== userCart.length) return -1;

  // 배송비 검증: 현재 3000원 고정
  if (deliveryFee !== 3000) return -1;

  // 가격 계산
  /*
    쿠폰 사용에 관해:
    현재 api 명세는 여러 개의 쿠폰을 받을 수 있도록 확장성 있게 작성되었으나
    제 실력 이슈로 일단 맨 앞 하나의 쿠폰만을 사용하도록 구현합니다
    (현재 어플리케이션 상에서도 하나의 쿠폰만 선택 가능하게 되어있음)
  */
  const originalPrice = orderingProducts.reduce(
    (prev, { quantity, product: { price } }) => prev + quantity * price,
    0
  );

  const coupon = serverUserCoupons.find(({ id }) => id === couponIds[0]);
  const discountedPrice = (() => {
    if (!coupon) return 0;
    if (coupon.type === 'percent') return originalPrice * (coupon.amount / 100);
    return coupon.amount;
  })();

  const actualPrice = Math.max(originalPrice - discountedPrice, 0);

  // 주문 목록 생성
  const orderInfo: OrderInfo = {
    actualPrice,
    deliveryFee,
    originalPrice,
    cartItems: orderingProducts.sort((one, another) => Number(one.id) - Number(another.id)),
    id: getAllOrderList().orders.length,
  };

  // 장바구니 및 쿠폰 지우기
  orderingProducts.forEach(({ product: { id } }) => Cart.setItem(id, 0));
  if (coupon) UserCoupon.use(coupon.id);

  // db(로컬스토리지)설정
  const { orders: newOrders } = getAllOrderList();
  newOrders.push(orderInfo);
  localStorage.setItem(KEY, JSON.stringify({ orders: newOrders }));

  return orderInfo.id;
};

const Order = { getAllOrderList, getOrderList, request };

export default Order;
