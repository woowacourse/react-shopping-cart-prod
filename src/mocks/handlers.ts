import { rest } from 'msw';
import couponData from './couponMockData.json';
import orderListData from './orderListMockData.json';
import type { CouponType, IssuableCouponType, OrderDetailType } from '../types/types';

const coupons = couponData as IssuableCouponType[];

let couponList = [] as CouponType[];

const orderList = orderListData as OrderDetailType[];

export const handlers = [
  rest.get('/coupons', async (_, res, ctx) => {
    await delay(200);
    return res(ctx.status(200), ctx.json(coupons));
  }),
  rest.post('/users/coupons', async (req, res, ctx) => {
    const { id } = await req.json<{ id: number }>();
    const foundCoupon = coupons.find((coupon) => coupon.id === id);
    const foundCouponIndex = coupons.findIndex((coupon) => coupon.id === id);
    if (foundCoupon && foundCoupon.issuable) {
      couponList.push(foundCoupon);
      coupons[foundCouponIndex].issuable = false;
      return res(ctx.status(201), ctx.text('Add Coupon Success'));
    }
    if (foundCoupon) {
      return res(ctx.status(201), ctx.text(' Coupon Already Have'));
    }
    return res(ctx.status(400, 'Coupon Does Not Found'));
  }),
  rest.get('/users/coupons', async (_, res, ctx) => {
    await delay(200);
    return res(ctx.status(200), ctx.json(couponList));
  }),
  rest.get('/orders', async (_, res, ctx) => {
    const data = orderList.map((orders) => {
      const { originalPrice, discountPrice, coupon, ...order } = orders;
      return order;
    });
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.post('/orders', async (req, res, ctx) => {
    const { couponId } = await req.json<{
      couponId: number;
    }>();
    const order: OrderDetailType = {
      id: orderList.length + 1,
      orderProducts: [
        {
          product: {
            id: 1,
            name: '치킨',
            imageUrl:
              'https://s3-alpha-sig.figma.com/img/05ef/e578/d81445480aff1872344a6b1b35323488?Expires=1685923200&Signature=mMQsQt3cnprJKKf4NdATsA6iVkLSEiqO~DyKZmtFviE6h~v8BRvX6bvWdOCgPk0OXnPmR5-88b5Ff1KkRPdFODWdOlbtZVzjFerGjRnphHrn85B9M2ne1oamQjDRpb9T151oMS729cSZd~kV4Cpp~b-iXPaasWO1Yh6n8WBhRDoWIT6VlMilwtkEhY5Wgvdp1JdL7JlcYgiZVcRxWXiN~wuMUkZ6NsdSJ4Lgye5ReS0-eN1g8jVv~HnOc3YrgLZK-BPqXhqJh1YtOLk31ryHLYFw1hi3yXY7o~YdG8Oa82Pg6TKdrfjoZrkc7BrrsUb6j8NAwHDO~LFTHw6ufqr-dA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            price: 20000,
          },
          quantity: 3,
        },
        {
          product: {
            id: 2,
            name: '피자',
            imageUrl:
              'https://s3-alpha-sig.figma.com/img/33d6/e526/45207e8000c3bd7f731f561a4b2cf8f4?Expires=1685923200&Signature=Ifn7QjAZJFLdNcznPcCrMpKR4vKahQml1wj44c6zi281Nq2TeU7EejDde~aFS24-fKiCHSyp1749iN7vjtVNS21ipKaUj5F2AgM~gTCsrDd1ijgtH~Y29f4bKqK3RjWVVY9cSK9aT1g~d2kk8A9~UKLYaEjHhMnlRfdiLgZp8qRFd~83pV-~7J5GRDavHlsBNdGBcKlS4kXD~e4ZCgzw7Tjd8BUaKho8ND7nak3TFHZ60mLp5VA~6ekQYtgittqPS6JJuJ2zZxvVLe7RR0HIiVsoJyDezDxBJA5ZVT5NaARM0N~5eYHAzLeEZMpnh7zat87eNIogatQ0f3H9NSfzkQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            price: 30000,
          },
          quantity: 2,
        },
      ],
      originalPrice: 20000,
      discountPrice: 14000,
      confirmState: false,
      coupon: {
        id: 1,
        name: '5월의 달 20% 할인 쿠폰',
        discountType: 'percentage',
        discountRate: 0.2,
        discountAmount: 0,
        minimumPrice: 0,
      },
    };
    orderList.push(order);
    couponList = couponList.filter((coupon) => coupon.id !== couponId);
    const responseHeaders = {
      Location: `orders/${order.id}`,
    };
    return res(ctx.status(200), ctx.set(responseHeaders));
  }),
  rest.get('/orders/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const order = orderList.find((order) => order.id === Number(id));
    if (order) return res(ctx.status(200), ctx.json(order));
    return res(ctx.status(400, 'Product Does Not Found'));
  }),
  // rest.get('/products', async (_, res, ctx) => {
  //   await delay(200);
  //   return res(ctx.status(200), ctx.json(products));
  // }),
  // rest.post('/products', async (req, res, ctx) => {
  //   const { product } = await req.json<{ product: ProductType }>();
  //   products.push(product);
  //   return res(ctx.status(200), ctx.text('Add Product Success'));
  // }),
  // rest.get('/cart-items', async (_, res, ctx) => {
  //   await delay(200);
  //   return res(ctx.status(200), ctx.json(cartList));
  // }),
  // rest.post('/cart-items', async (req, res, ctx) => {
  //   const { productId } = await req.json<{ productId: number }>();
  //   const foundProduct = products.find((product) => product.id === productId);
  //   if (foundProduct) {
  //     const newCartItem = {
  //       id: Date.now(),
  //       quantity: 1,
  //       product: foundProduct,
  //     };
  //     cartList.push(newCartItem);
  //     return res(ctx.status(201), ctx.text('Add Cart Item Success'));
  //   }
  //   return res(ctx.status(400, 'Product Does Not Found'));
  // }),
  // rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
  //   const { cartItemId } = req.params;
  //   const { quantity } = await req.json<{ quantity: number }>();
  //   const foundCartItemIndex = cartList.findIndex((cart) => cart.id === Number(cartItemId));
  //   if (quantity && foundCartItemIndex !== -1) {
  //     const newCartList = cartList.map((cartItem, index) =>
  //       index === foundCartItemIndex ? { ...cartItem, quantity } : cartItem,
  //     );
  //     cartList = newCartList;
  //     return res(ctx.status(200), ctx.text('Cart Item Quantity Change Success'));
  //   }
  //   return res(ctx.status(400, 'CartItem Does Not Found'));
  // }),
  // rest.delete('/cart-items/:cartItemId', async (req, res, ctx) => {
  //   const { cartItemId } = req.params;
  //   const foundCartItemIndex = cartList.findIndex((cart) => cart.id === Number(cartItemId));
  //   if (foundCartItemIndex !== -1) {
  //     cartList.splice(foundCartItemIndex, 1);
  //     return res(ctx.status(200), ctx.text('Cart Item Delete Success'));
  //   }
  //   return res(ctx.status(400, 'CartItem Does Not Found'));
  // }),
];

async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
