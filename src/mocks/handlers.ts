import { rest } from 'msw';
import productList from '../mocks/productList.json';
import couponList from '../mocks/couponList.json';
import {
  CART_BASE_URL,
  COUPON_BASE_URL,
  LOCAL_STORAGE_KEY,
  ORDERS_BASE_URL,
  PRODUCTS_BASE_URL,
} from '../constants';
import { getLocalStorage, updateLocalStorage } from '../utils/store';
import { CartItemInfo, OrderDetailItemInfo, OrderItemInfo } from '../types';

export const handlers = [
  // 상품 조회
  rest.get(`${PRODUCTS_BASE_URL}/:id`, (req, res, ctx) => {
    const productId = Number(req.params.id);
    const product = productList.find((product) => product.id === productId);

    if (!product) {
      return res(ctx.status(404), ctx.json({ message: '해당 상품이 존재하지 않습니다.' }));
    }

    return res(ctx.status(200), ctx.json(product));
  }),

  // 상품목록 조회
  rest.get(PRODUCTS_BASE_URL, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(productList));
  }),

  // 장바구니 목록 조회
  rest.get(CART_BASE_URL, (req, res, ctx) => {
    const cartList = getLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART);
    return res(ctx.status(200), ctx.json(cartList));
  }),

  // 장바구니 아이템 추가
  rest.post(CART_BASE_URL, async (req, res, ctx) => {
    const { productId } = await req.json();
    const response = await fetch(`${PRODUCTS_BASE_URL}/${productId}`);
    const productInfo = await response.json();
    const currentCartList = getLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART);

    const newCartList: CartItemInfo[] = [
      ...currentCartList,
      {
        id: productId,
        quantity: 1,
        product: productInfo,
      },
    ];

    updateLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART, newCartList);

    return res(ctx.status(201), ctx.set('Location', `/cart-items/${newCartList.at(-1)?.id}`));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch(`${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    const cartId = Number(req.params.id);
    const { quantity } = await req.json();
    const cartList = getLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART);

    const newCartList = cartList.map((cartItem) => {
      if (cartItem.id !== cartId) return cartItem;

      return { ...cartItem, quantity };
    });

    updateLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART, newCartList);

    return res(ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${CART_BASE_URL}/:id`, (req, res, ctx) => {
    const cartId = Number(req.params.id);
    const cartList = getLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART);
    const newCartList = cartList.filter((cartItem) => cartItem.id !== cartId);

    updateLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART, newCartList);

    return res(ctx.status(204));
  }),

  // 주문 목록 조회
  rest.get(ORDERS_BASE_URL, (req, res, ctx) => {
    const orders = getLocalStorage<OrderItemInfo[]>(LOCAL_STORAGE_KEY.ORDERS);
    return res(ctx.status(200), ctx.json(orders));
  }),

  // 주문 상세 조회
  rest.get(`${ORDERS_BASE_URL}/:id`, (req, res, ctx) => {
    const orderId = Number(req.params.id);
    const orderDetailList = getLocalStorage<OrderDetailItemInfo[]>(LOCAL_STORAGE_KEY.DETAIL_ORDERS);
    const orderDetailItem = orderDetailList.find((orderItem) => orderItem.id === orderId);

    if (!orderDetailItem) {
      return res(ctx.status(404), ctx.json({ message: '해당 주문이 존재하지 않습니다.' }));
    }

    return res(ctx.status(200), ctx.json(orderDetailItem));
  }),

  // 주문 아이템 추가
  rest.post(ORDERS_BASE_URL, async (req, res, ctx) => {
    const { cartItemIds, couponId, deliveryFee, totalOrderPrice } = await req.json();
    const response = await fetch(COUPON_BASE_URL);
    const rawCouponList = await response.json();
    const couponList = [...rawCouponList.rateCoupon, ...rawCouponList.fixedCoupon];
    const currentCoupon = couponList.find((coupon) => coupon.id === couponId);

    const currentCartList = getLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART);
    const currentOrderList = getLocalStorage<OrderItemInfo[]>(LOCAL_STORAGE_KEY.ORDERS);
    const currentOrderDetailList = getLocalStorage<OrderDetailItemInfo[]>(
      LOCAL_STORAGE_KEY.DETAIL_ORDERS
    );

    const currentDate = new Date();
    const [day, month, year] = [
      currentDate.getDate().toString().padStart(2, '0'),
      (currentDate.getMonth() + 1).toString().padStart(2, '0'),
      currentDate.getFullYear(),
    ];

    const selectedCarts = currentCartList.filter((cartItem) => cartItemIds.includes(cartItem.id));

    const productsInOrder = selectedCarts.map((cartItem) => {
      return {
        id: cartItem.product.id,
        name: cartItem.product.name,
        price: cartItem.product.price,
        imageUrl: cartItem.product.imageUrl,
        quantity: cartItem.quantity,
      };
    });

    const totalProductsPrice = productsInOrder.reduce((sum, product) => {
      const productTotal = product.price * product.quantity;
      return sum + productTotal;
    }, 0);

    const newOrderList: OrderItemInfo[] = [
      ...currentOrderList,
      {
        id: currentOrderList.length + 1,
        orderNumber: currentOrderList.length + 1,
        date: `${year}-${month}-${day}`,
        totalOrderPrice: totalOrderPrice,
        products: productsInOrder,
      },
    ];

    let discountPrice = 0;
    if (currentCoupon && 'discountPrice' in currentCoupon) {
      discountPrice = currentCoupon.discountPrice;
    }
    if (currentCoupon && 'discountRate' in currentCoupon) {
      discountPrice = (totalProductsPrice + deliveryFee) * (currentCoupon.discountRate / 100);
    }

    const newOrderDetailList: OrderDetailItemInfo[] = [
      ...currentOrderDetailList,
      {
        id: currentOrderList.length + 1,
        orderNumber: currentOrderList.length + 1,
        date: `${year}-${month}-${day}`,
        totalOrderPrice: totalOrderPrice,
        products: productsInOrder,
        deliveryFee: deliveryFee,
        usingCouponName: currentCoupon ? currentCoupon.name : '',
        discountPrice: discountPrice,
        beforeDiscountPrice: totalOrderPrice + discountPrice,
      },
    ];

    const newCartList = currentCartList.filter((cartItem) => !cartItemIds.includes(cartItem.id));

    updateLocalStorage<CartItemInfo[]>(LOCAL_STORAGE_KEY.CART, newCartList);
    updateLocalStorage<OrderItemInfo[]>(LOCAL_STORAGE_KEY.ORDERS, newOrderList);
    updateLocalStorage<OrderDetailItemInfo[]>(LOCAL_STORAGE_KEY.DETAIL_ORDERS, newOrderDetailList);

    return res(
      ctx.status(201),
      ctx.set('Location', `${ORDERS_BASE_URL}/${newOrderList.at(-1)?.id}`)
    );
  }),

  // 쿠폰목록 조회
  rest.get(COUPON_BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(couponList));
  }),
];
