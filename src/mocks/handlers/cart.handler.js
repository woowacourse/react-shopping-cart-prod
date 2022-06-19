import { rest } from 'msw';

import { API_ENDPOINT } from 'api/constants';
import { BASE_URL } from 'api/customInstance';

import { MOCK_ERROR_MESSAGE } from 'mocks/constant';
import data from 'mocks/data';

const cartDB = () => {
  let cart = JSON.parse(window.localStorage.getItem('server-shopping-cart')) || [];

  const getCart = () => cart;
  const setCart = (newCart) => {
    cart = newCart;
    window.localStorage.setItem('server-shopping-cart', JSON.stringify(newCart));
  };

  return { getCart, setCart };
};

const { getCart, setCart } = cartDB();

const findProductCartIndex = (currentShoppingCart, targetId) => {
  return currentShoppingCart.findIndex(({ product }) => product.id === targetId);
};

const handleGetShoppingCartRequest = (_, res, ctx) => {
  const cart = getCart();
  return res(ctx.json(cart));
};

const findProductData = (targetId) => data.products.find(({ id }) => id === targetId);

const handlePostShoppingCartRequest = (req, res, ctx) => {
  const currentShoppingCart = getCart();
  const { productId, quantity } = req.body;

  const cartProductIndex = findProductCartIndex(currentShoppingCart, productId);
  const productData = findProductData(productId);

  if (productData === undefined) {
    return res(
      ctx.status(400),
      ctx.json({ message: MOCK_ERROR_MESSAGE.NOT_EXIST_PRODUCT }),
    );
  }

  if (cartProductIndex >= 0) {
    const cartProduct = currentShoppingCart[cartProductIndex];

    if (productData.stock < quantity + cartProduct.quantity) {
      return res(
        ctx.status(400),
        ctx.json({
          message: MOCK_ERROR_MESSAGE.EXCEED_STORABLE_QUANTITY(
            productData.stock,
            cartProduct.quantity,
          ),
        }),
      );
    }

    const newCartProduct = { ...cartProduct, quantity: cartProduct.quantity + quantity };
    currentShoppingCart[cartProductIndex] = newCartProduct;
  } else {
    const newCartProduct = {};
    newCartProduct.product = findProductData(productId);
    newCartProduct.quantity = quantity;
    currentShoppingCart.push(newCartProduct);
  }

  setCart(currentShoppingCart);

  return res(ctx.json(currentShoppingCart));
};

const handlePatchShoppingCartRequest = (req, res, ctx) => {
  const { productId, quantity } = req.body;
  const currentShoppingCart = getCart();

  const productIndex = findProductCartIndex(currentShoppingCart, productId);

  if (!currentShoppingCart.length || productIndex < 0) {
    return res(
      ctx.status(404),
      ctx.json({ message: MOCK_ERROR_MESSAGE.NOT_EXIST_IN_SHOPPING_CART }),
    );
  }

  const targetProduct = currentShoppingCart[productIndex];
  targetProduct.quantity = quantity;

  currentShoppingCart[productIndex] = targetProduct;

  setCart(currentShoppingCart);

  return res(ctx.json(currentShoppingCart));
};

const handleDeleteShoppingCartRequest = (req, res, ctx) => {
  const productId = Number(req.url.searchParams.get('productId'));
  const currentShoppingCart = getCart();

  const productIndex = findProductCartIndex(currentShoppingCart, productId);

  if (currentShoppingCart.length === 0 || productIndex < 0) {
    return res(
      ctx.status(404),
      ctx.json({ message: MOCK_ERROR_MESSAGE.NOT_EXIST_IN_SHOPPING_CART }),
    );
  }

  const newCart = [
    ...currentShoppingCart.slice(0, productIndex),
    ...currentShoppingCart.slice(productIndex + 1),
  ];

  setCart(newCart);

  return res(ctx.json(newCart));
};

export default [
  rest.get(`${BASE_URL}${API_ENDPOINT.SHOPPING_CART.BASE}`, handleGetShoppingCartRequest),
  rest.post(
    `${BASE_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handlePostShoppingCartRequest,
  ),
  rest.patch(
    `${BASE_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handlePatchShoppingCartRequest,
  ),
  rest.delete(
    `${BASE_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handleDeleteShoppingCartRequest,
  ),
];
