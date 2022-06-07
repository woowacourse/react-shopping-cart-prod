import data from 'mocks/data';
import { MOCK_ERROR_MESSAGE } from 'mocks/constant';

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

export const handleGetShoppingCartRequest = (_, res, ctx) => {
  const cart = getCart();
  return res(ctx.json(cart));
};

const findProductData = (targetId) => data.products.find(({ id }) => id === targetId);

export const handlePostShoppingCartRequest = (req, res, ctx) => {
  const currentShoppingCart = getCart();
  const { id, quantity } = req.body;

  const cartProductIndex = findProductCartIndex(currentShoppingCart, id);
  const productData = findProductData(id);

  if (productData === undefined) {
    return res(ctx.status(400), ctx.json({ message: MOCK_ERROR_MESSAGE.NOT_EXIST_PRODUCT}));
  }

  if (cartProductIndex >= 0) {
    const cartProduct = currentShoppingCart[cartProductIndex];

    if (productData.stock < quantity + cartProduct.quantity) {
      return res(ctx.status(400), ctx.json({ message: MOCK_ERROR_MESSAGE.EXCEED_STORABLE_QUANTITY(productData.stock, cartProduct.quantity), }));
    }
    
    const newCartProduct = { ...cartProduct, quantity: cartProduct.quantity + quantity };
    currentShoppingCart[cartProductIndex] = newCartProduct;
  } else {
    const newCartProduct = {};
    newCartProduct.product = findProductData(id);
    newCartProduct.quantity = quantity;
    currentShoppingCart.push(newCartProduct);
  }

  setCart(currentShoppingCart);

  return res(ctx.json(currentShoppingCart));
};

export const handlePatchShoppingCartRequest = (req, res, ctx) => {
  const { id, quantity } = req.body;
  const currentShoppingCart = getCart();

  const productIndex = findProductCartIndex(currentShoppingCart, id);

  if (!currentShoppingCart.length || productIndex < 0) {
    return res(
      ctx.status(404, '장바구니가 비었거나 장바구니에 존재하지 않는 상품입니다.'),
    );
  }

  const targetProduct = currentShoppingCart[productIndex];
  targetProduct.quantity = quantity;

  currentShoppingCart[productIndex] = targetProduct;

  setCart(currentShoppingCart);

  return res(ctx.json(currentShoppingCart));
};

export const handleDeleteShoppingCartRequest = (req, res, ctx) => {
  const { productId: idString } = req.params;
  const productId = Number(idString);

  const currentShoppingCart = getCart();

  const productIndex = findProductCartIndex(currentShoppingCart, productId);

  if (currentShoppingCart.length === 0 || productIndex < 0) {
    return res(
      ctx.status(404, '장바구니가 비었거나 장바구니에 존재하지 않는 상품입니다.'),
    );
  }

  const newCart = [
    ...currentShoppingCart.slice(0, productIndex),
    ...currentShoppingCart.slice(productIndex + 1),
  ];

  setCart(newCart);

  return res(ctx.json(newCart));
};
