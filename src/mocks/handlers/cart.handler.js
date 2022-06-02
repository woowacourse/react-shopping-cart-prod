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

export const handleGetShoppingCartRequest = (_, res, ctx) => {
  const cart = getCart();
  return res(ctx.json(cart));
};

const findProductData = (productId) => data.products.find(({ id }) => id === productId);

export const handlePostShoppingCartRequest = (req, res, ctx) => {
  const currentShoppingCart = getCart();
  const { productId, quantity } = req.body;

  const newCartProduct = {};
  newCartProduct.productData = findProductData(productId);
  newCartProduct.quantity = quantity;

  currentShoppingCart.push(newCartProduct);

  setCart(currentShoppingCart);

  return res(ctx.json(currentShoppingCart));
};

const findProductCartIndex = (currentShoppingCart, productId) => {
  return currentShoppingCart.findIndex(({ productData }) => productData.id === productId);
};

export const handlePatchShoppingCartRequest = (req, res, ctx) => {
  const { productId, quantity } = req.body;
  const currentShoppingCart = getCart();

  const productIndex = findProductCartIndex(currentShoppingCart, productId);

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
