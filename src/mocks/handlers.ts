import { rest } from 'msw';
import { LOCAL_STORAGE_KEY } from '../constants';
import { cartItems, products, orderList, paymentsData } from '../data/mockData';
import { CartItem, Order, Product } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const handlers = [
  // 제품 목록
  rest.get('/products', (req, res, ctx) => res(ctx.delay(2000), ctx.status(200), ctx.json(products))),

  // 제품 추가
  rest.post('/products', (req, res, ctx) => {
    const newData = req.json();
    const id = Math.random().toString(36).substring(7);
    const responseWithId = { ...newData, id: Number(id) };
    products.push(responseWithId as unknown as Product);

    return res(ctx.status(201), ctx.json(responseWithId));
  }),

  // 특정 id의 제품 정보
  rest.get('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = products.find(item => item.id === Number(id));
    const responseWithId = { ...product, id };

    if (responseWithId) {
      return res(ctx.status(200), ctx.json(responseWithId));
    }
    return res(ctx.status(404));
  }),

  // 특정 id 제품 삭제
  rest.delete('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = products.findIndex(item => item.id === Number(id));

    if (index !== -1) {
      products.splice(index, 1);
      return res(ctx.status(204));
    }
    return res(ctx.status(404));
  }),

  // 특정 id 제품 수정
  rest.put('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = products.findIndex(item => item.id === Number(id));

    if (index !== -1) {
      products[index] = req.json() as unknown as Product;
      return res(ctx.json(products[index]));
    }
    return res(ctx.status(404));
  }),

  // 장바구니 아이템 조회
  rest.get('/cart-items', (req, res, ctx) => res(ctx.delay(100), ctx.status(200), ctx.json(cartItems))),

  // 장바구니 아이템 추가
  rest.post<CartItem>('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();

    const item = {
      id: Math.floor(Math.random() * 1000),
      quantity: 1,
      product: products.find(product => product.id === productId),
    };

    cartItems.push(item as CartItem);
    setLocalStorage(LOCAL_STORAGE_KEY.CART_ITEM, cartItems);

    return res(ctx.delay(100), ctx.status(201), ctx.set('Location', `/cart-items/${item.id}`));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch<CartItem>('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    const itemIndex = cartItems.findIndex(item => item.id === Number(cartItemId));

    if (itemIndex === -1) {
      return res(ctx.status(404));
    }

    cartItems[itemIndex].quantity = quantity;
    setLocalStorage(LOCAL_STORAGE_KEY.CART_ITEM, cartItems);

    return res(ctx.delay(100), ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete('/cart-items/:cartItemsId', (req, res, ctx) => {
    const { cartItemsId } = req.params;
    const itemIndex = cartItems.findIndex(item => item.id === Number(cartItemsId));

    if (itemIndex >= 0) {
      cartItems.splice(itemIndex, 1);
      setLocalStorage(LOCAL_STORAGE_KEY.CART_ITEM, cartItems);
      return res(ctx.delay(100), ctx.status(204), ctx.set('Location', `/cart-items/${cartItemsId}`));
    }
    return res(ctx.status(404));
  }),

  // 주문 목록 추가
  rest.post('/orders', async (req, res, ctx) => {
    const { cartItemIds } = await req.json();

    const selected = cartItems.filter(item => cartItemIds.includes(item.id));

    const orderItem: Order = {
      id: Math.floor(Math.random() * 1000),
      orderTime: new Date().toDateString(),
      productList: selected.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity,
        imageUrl: item.product.imageUrl,
      })),
    };

    orderList.push(orderItem);

    setLocalStorage<Order[]>(LOCAL_STORAGE_KEY.ORDER_LIST, orderList);

    const updatedCartItems = cartItems.filter(item => !cartItemIds.includes(item.id));
    setLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, updatedCartItems);

    return res(ctx.delay(100), ctx.status(201), ctx.set('Location', `/orders/${orderItem.id}`));
  }),

  // 주문 가격표 출력
  rest.get('/total-cart-price', async (req, res, ctx) => {
    const cartItemIds = req.url.searchParams.getAll('cartItemIds');

    const originalPrice = getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []).reduce((acc, item) => {
      if (cartItemIds.find((id: string) => id === String(item.id))) {
        return acc + item.quantity * item.product.price;
      }
      return acc;
    }, 0);

    const discounts = [];

    if (originalPrice >= 50_000) {
      discounts.push({
        discountPolicy: '5만원 이상 주문 시 10% 할인',
        discountAmount: Math.floor(originalPrice / 1000) * 100,
      });
    }
    const discountedPrice = originalPrice - discounts.reduce((acc, { discountAmount }) => acc + discountAmount, 0);
    const deliveryFee = 3000;

    paymentsData.originalPrice = originalPrice;
    paymentsData.discounts = discounts;
    paymentsData.discountedPrice = discountedPrice;
    paymentsData.deliveryFee = deliveryFee;
    paymentsData.finalPrice = discountedPrice + deliveryFee;
    setLocalStorage(LOCAL_STORAGE_KEY.PAYMENTS, paymentsData);

    return res(ctx.delay(50), ctx.status(201), ctx.json(paymentsData));
  }),
];

export default handlers;
