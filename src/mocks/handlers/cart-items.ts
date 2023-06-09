import cartItems from '../fixtures/cart-items';
import products from '../fixtures/products';
import rest from '../rest';

export const handlers = [
  rest.get('/cart-items', (req, res) => {
    return res(res.response(200, cartItems));
  }),

  rest.post('/cart-items', async (req, res) => {
    const body = await req.json();
    const { productId } = body;

    if (cartItems.some((cartItem) => cartItem.product.id === productId)) {
      return res(res.response(409, { message: '이미 카드에 존재하는 상품입니다.' }));
    }

    const product = products.find((it) => it.id === productId) ?? null;
    if (product === null) {
      return res(res.response(404, { message: '존재하지 않는 상품입니다.' }));
    }

    const cartItemId = Math.max(1, ...cartItems.map((cartItem) => cartItem.id)) + 1;

    cartItems.push({
      id: cartItemId,
      product,
      checked: true,
      quantity: 1,
    });

    return res(
      res.response(201, { quantity: 1, checked: true }, { location: `/cart-items/${cartItemId}` }),
    );
  }),

  rest.patch('/cart-items/:cartItemId', async (req, res) => {
    const { cartItemId } = req.params;
    const body = await req.json();
    const { quantity, checked } = body;

    const cartItem = cartItems.find((it) => String(it.id) === cartItemId) ?? null;
    if (cartItem === null) {
      return res(res.response(404, { message: '존재하지 않는 장바구니 아이템입니다.' }));
    }

    cartItem.quantity = quantity;
    cartItem.checked = checked;

    return res(
      res.response(200, {
        quantity: cartItem.quantity,
        checked: cartItem.checked,
      }),
    );
  }),

  rest.delete('/cart-items/:cartItemId', async (req, res) => {
    const { cartItemId } = req.params;

    const foundIndex = cartItems.findIndex((it) => it.id === Number(cartItemId));
    if (foundIndex === -1) {
      return res(res.response(404, { message: '존재하지 않는 장바구니 아이템입니다.' }));
    }

    cartItems.splice(foundIndex, 1);
    return res(res.response(204));
  }),
];
