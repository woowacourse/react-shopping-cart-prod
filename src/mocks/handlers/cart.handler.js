import data from 'mocks/data';
import { DB_KEYS, ERROR_MESSAGES } from 'mocks/handlers/constants';
import handleDB from 'mocks/handlers/handleDB';

const [getCart, setCart] = handleDB(DB_KEYS.CART);

const findProductData = (productId) => data.products.find(({ id }) => id === productId);
const findProductCartIndex = (currentShoppingCart, targetId) => {
  return currentShoppingCart.findIndex(({ productId }) => productId === targetId);
};
const createResponseCart = (cart) =>
  cart.map(({ productId, quantity }) => {
    const product = findProductData(productId);
    return { product, quantity };
  });

export const handleGetShoppingCartRequest = (_, res, ctx) => {
  const cart = getCart();

  const responseCart = createResponseCart(cart);

  return res(ctx.json(responseCart));
};

const updateCartProductQuantity = (productId, quantity) => {
  const currentShoppingCart = getCart();
  const productIndex = findProductCartIndex(currentShoppingCart, productId);
  const { stock } = findProductData(productId);

  if (quantity > stock) {
    throw new Error(ERROR_MESSAGES.EXCEED_QUANTITY(stock, quantity));
  }
  if (productIndex < 0) {
    throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
  }

  const targetProduct = currentShoppingCart[productIndex];

  targetProduct.quantity = quantity;
  currentShoppingCart[productIndex] = targetProduct;

  setCart(currentShoppingCart);
  return currentShoppingCart;
};

export const handlePostShoppingCartRequest = (req, res, ctx) => {
  const currentShoppingCart = getCart();
  const { productId, quantity } = req.body;
  const cartProductIndex = findProductCartIndex(currentShoppingCart, productId);
  const { stock } = findProductData(productId);

  if (quantity > stock) {
    return res(
      ctx.status(400),
      ctx.json({ message: ERROR_MESSAGES.EXCEED_QUANTITY(stock, quantity) }),
    );
  }

  if (cartProductIndex < 0) {
    const newProduct = { productId, quantity };
    currentShoppingCart.push(newProduct);

    setCart(currentShoppingCart);
    return res(ctx.status(201));
  }

  try {
    const { quantity: prevQuantity } = currentShoppingCart[cartProductIndex];
    updateCartProductQuantity(productId, prevQuantity + quantity);
    return res(ctx.status(201));
  } catch ({ message }) {
    return res(ctx.status(400), ctx.json({ message }));
  }
};

export const handlePatchShoppingCartRequest = (req, res, ctx) => {
  const { productId, quantity } = req.body;
  try {
    const newCart = updateCartProductQuantity(productId, quantity);
    return res(ctx.json(createResponseCart(newCart)));
  } catch ({ message }) {
    ctx.status(400, ctx.json({ message }));
  }
};

export const handleDeleteShoppingCartRequest = (req, res, ctx) => {
  const idString = req.url.searchParams.get('id');
  const productId = Number(idString);

  const currentShoppingCart = getCart();

  const productIndex = findProductCartIndex(currentShoppingCart, productId);

  if (currentShoppingCart.length === 0 || productIndex < 0) {
    return res(ctx.status(400, ERROR_MESSAGES.CART_PRODUCT_NOT_FOUNT));
  }

  const newCart = [
    ...currentShoppingCart.slice(0, productIndex),
    ...currentShoppingCart.slice(productIndex + 1),
  ];

  setCart(newCart);

  return res(ctx.json(createResponseCart(newCart)));
};
