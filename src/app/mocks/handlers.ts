// src/mocks/handlers.js
import { rest } from "msw";
import mockProducts from "../../assets/mockProducts.json";
import mockMembers from "../../assets/mockMembers.json";
import mockCoupons from "../../assets/mockCoupons.json";
import { getSessionStorage, setSessionStorage } from "../utils/storage.ts";
import { CartItem } from "../../types/types.ts";
import {
  SESSION_STORAGE_KEY_CART_ITEMS,
  SESSION_STORAGE_KEY_COUPONS,
  SESSION_STORAGE_KEY_POINT,
} from "../keys.ts";

export const handlers = [
  rest.get("/products", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockProducts));
  }),

  rest.get("/cart-items", (req, res, ctx) => {
    const cartItems = getSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, []);

    return res(ctx.delay(100), ctx.status(200), ctx.json(cartItems));
  }),

  rest.post("/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    const cartItems = getSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, []);

    const newItemId = Date.now();

    const newItem = {
      id: newItemId,
      quantity: 1,
      checked: true,
      product: mockProducts.find((product) => product.id === productId),
    };

    setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, [...cartItems, newItem]);
    return res(ctx.delay(100), ctx.status(201), ctx.json(true));
  }),

  rest.delete("/cart-items/:cartItemId", (req, res, ctx) => {
    const { cartItemId } = req.params;
    const cartItems = getSessionStorage<CartItem[]>(
      SESSION_STORAGE_KEY_CART_ITEMS,
      []
    );

    setSessionStorage(
      SESSION_STORAGE_KEY_CART_ITEMS,
      cartItems.filter((item) => item.id !== Number(cartItemId))
    );
    return res(ctx.delay(100), ctx.status(204));
  }),

  rest.patch("/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    const cartItems = getSessionStorage<CartItem[]>(
      SESSION_STORAGE_KEY_CART_ITEMS,
      []
    );
    const cartItemIndex = cartItems.findIndex(
      (item) => item.id === Number(cartItemId)
    );
    cartItems[cartItemIndex].quantity = quantity;

    setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, cartItems);

    return res(ctx.delay(100), ctx.status(200), ctx.json(true));
  }),

  rest.post("/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    const cartItems = getSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, []);

    const newItemId = Date.now();

    const newItem = {
      id: newItemId,
      quantity: 1,
      checked: true,
      product: mockProducts.find((product) => product.id === productId),
    };

    setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, [...cartItems, newItem]);
    return res(ctx.delay(100), ctx.status(201), ctx.json(true));
  }),

  rest.get("/members", (req, res, ctx) => {
    return res(ctx.delay(100), ctx.status(200), ctx.json(mockMembers));
  }),

  rest.get("/coupons", async (req, res, ctx) => {
    const coupons = getSessionStorage(SESSION_STORAGE_KEY_COUPONS, []);

    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json(
        coupons.length > 0
          ? coupons
          : mockCoupons
      )
    );
  }),

  rest.get("/point", async (req, res, ctx) => {
    const point = getSessionStorage(SESSION_STORAGE_KEY_POINT, {
      pointHistories: [],
      totalPoint: 1000
    });

    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json(point)
    );
  }),
];
