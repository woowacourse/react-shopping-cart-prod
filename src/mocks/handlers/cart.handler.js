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

const findProductCartIndex = (currentShoppingCart, productId) => {
  return currentShoppingCart.findIndex(({ productData }) => productData.id === productId);
};

export const handleGetShoppingCartRequest = (_, res, ctx) => {
  const cart = getCart();
  return res(ctx.json(cart));
};

const findProductData = (productId) => data.products.find(({ id }) => id === productId);
const EXCEED_QUANTITY = (stock, quantity) =>
  `장바구니에 추가할 수 있는 최대 수량을 초과했습니다. 추가 가능한 최대 수량은 ${Math.max(
    stock - quantity,
    0,
  )}개입니다.`;

const updateCartProductQuantity = (productId, quantity) => {
  const currentShoppingCart = getCart();
  const productIndex = findProductCartIndex(currentShoppingCart, productId);
  const { stock } = findProductData(productId);
  if (quantity > stock) {
    throw new Error(EXCEED_QUANTITY(stock, quantity));
  }

  if (productIndex < 0) {
    throw new Error('존재하지 않는 상품입니다.');
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

  const productData = findProductData(productId);

  if (cartProductIndex < 0) {
    const newProduct = { productData, quantity };
    currentShoppingCart.push(newProduct);

    setCart(currentShoppingCart);
    return res(ctx.json(currentShoppingCart));
  }

  const { quantity: prevQuantity } = currentShoppingCart[cartProductIndex];

  try {
    const newCart = updateCartProductQuantity(productId, prevQuantity + quantity);
    return res(ctx.json(newCart));
  } catch ({ message }) {
    return res(ctx.status(400), ctx.json({ message }));
  }
};

export const handlePatchShoppingCartRequest = (req, res, ctx) => {
  const { productId, quantity } = req.body;
  try {
    const newCart = updateCartProductQuantity(productId, quantity);
    return res(ctx.json(newCart));
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
