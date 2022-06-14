// @ts-nocheck

// actions
const CART_ACTIONS = {
  PUT: 'cart/PUT',
  DELETE: 'cart/DELETE',
  SELECTIVE_DELETE: 'cart/SELECTIVE_DELETE',
  INITIALIZE: 'cart/INITIALIZE',
  GET: 'cart/GET',
  ORDER: 'cart/ORDER',
};

const ORDER_ACTIONS = {
  ADD: 'order/ADD',
  DELETE: 'order/DELETE',
  INITIALIZE: 'order/INITIALIZE',
};

// action creator
const doPutProductToCart = ({ productId, name, price, image, quantity }) => ({
  type: CART_ACTIONS.PUT,
  productId,
  name,
  price,
  image,
  quantity,
});
const doDeleteProductFromCart = ({ id }) => ({ type: CART_ACTIONS.DELETE, id });
const doSelectiveDeleteFromCart = () => ({ type: CART_ACTIONS.SELECTIVE_DELETE });
const doInitializeCart = () => ({ type: CART_ACTIONS.INITIALIZE });
const doGetCart = ({ cart }) => ({ type: CART_ACTIONS.GET, cart });
const doOrderFromCart = () => ({ type: CART_ACTIONS.ORDER });

const doAddProdcutToOrder = ({ id }) => ({ type: ORDER_ACTIONS.ADD, id });
const doDeleteProductFromOrder = ({ id }) => ({ type: ORDER_ACTIONS.DELETE, id });
const doInitializeOrder = () => ({ type: ORDER_ACTIONS.INITIALIZE });

// reducer
const initState = {
  shoppingCart: [],
  order: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case CART_ACTIONS.PUT:
      const isExist = state.shoppingCart.some(product => product.productId === action.productId);

      return {
        ...state,
        shoppingCart: isExist
          ? state.shoppingCart.map(product =>
              product.productId === action.productId
                ? { ...product, quantity: action.quantity }
                : product,
            )
          : state.shoppingCart.concat({
              productId: action.productId,
              name: action.name,
              price: action.price,
              image: action.image,
              quantity: action.quantity,
            }),
        order: isExist ? state.order : [...state.order, action.productId],
      };

    case CART_ACTIONS.DELETE:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(product => product.productId !== action.id),
        order: state.order.filter(productId => productId !== action.id),
      };

    case CART_ACTIONS.SELECTIVE_DELETE:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          product => !state.order.includes(product.productId),
        ),
        order: [],
      };

    case CART_ACTIONS.INITIALIZE:
      return {
        ...state,
        shoppingCart: [],
        order: [],
      };

    case CART_ACTIONS.GET:
      return {
        ...state,
        shoppingCart: [...action.cart],
        order: action.cart.map(product => product.productId),
      };

    case CART_ACTIONS.ORDER: // TODO : selective delete와 겹침
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          product => !state.order.includes(product.productId),
        ),
        order: [],
      };

    case ORDER_ACTIONS.ADD:
      return {
        ...state,
        order: [...state.order, action.id],
      };

    case ORDER_ACTIONS.DELETE:
      return {
        ...state,
        order: state.order.filter(productId => productId !== action.id),
      };

    case ORDER_ACTIONS.INITIALIZE:
      return {
        ...state,
        order: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
export {
  doPutProductToCart,
  doDeleteProductFromCart,
  doSelectiveDeleteFromCart,
  doInitializeCart,
  doAddProdcutToOrder,
  doDeleteProductFromOrder,
  doInitializeOrder,
  doGetCart,
  doOrderFromCart,
};
