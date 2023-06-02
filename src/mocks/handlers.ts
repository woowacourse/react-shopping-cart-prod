// src/mocks/handlers.js
import { rest } from "msw";
import mockData from "../assets/mockData.json";
import { getSessionStorage, setSessionStorage } from "../utils/storage.ts";
import { CartItem } from "../types/types";

const LOCAL_STORAGE_KEY = "cartItems";

export const handlers = [
  rest.get("/products", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockData));
  }),

  rest.get("/cart-items", (req, res, ctx) => {
    const cartItems = getSessionStorage(LOCAL_STORAGE_KEY, []);

    return res(ctx.delay(100), ctx.status(200), ctx.json(cartItems));
  }),

  rest.post("/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    const cartItems = getSessionStorage(LOCAL_STORAGE_KEY, []);

    const newItemId = Date.now();

    const newItem = {
      id: newItemId,
      quantity: 1,
      checked: true,
      product: mockData.find((product) => product.id === productId),
    };

    setSessionStorage(LOCAL_STORAGE_KEY, [...cartItems, newItem]);
    return res(ctx.delay(100), ctx.status(201), ctx.json(true));
  }),

  rest.delete("/cart-items/:cartItemId", (req, res, ctx) => {
    const { cartItemId } = req.params;
    const cartItems = getSessionStorage<CartItem[]>(LOCAL_STORAGE_KEY, []);

    setSessionStorage(
      LOCAL_STORAGE_KEY,
      cartItems.filter((item) => item.id !== Number(cartItemId))
    );
    return res(ctx.delay(100), ctx.status(204));
  }),

  rest.patch("/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    const cartItems = getSessionStorage<CartItem[]>(LOCAL_STORAGE_KEY, []);
    const cartItemIndex = cartItems.findIndex(
      (item) => item.id === Number(cartItemId)
    );
    cartItems[cartItemIndex].quantity = quantity;

    setSessionStorage(LOCAL_STORAGE_KEY, cartItems);

    return res(ctx.delay(100), ctx.status(200), ctx.json(true));
  }),

  rest.post("/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    const cartItems = getSessionStorage(LOCAL_STORAGE_KEY, []);

    const newItemId = Date.now();

    const newItem = {
      id: newItemId,
      quantity: 1,
      checked: true,
      product: mockData.find((product) => product.id === productId),
    };

    setSessionStorage(LOCAL_STORAGE_KEY, [...cartItems, newItem]);
    return res(ctx.delay(100), ctx.status(201), ctx.json(true));
  }),
];
