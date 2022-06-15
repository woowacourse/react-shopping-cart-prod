// Action Types
const CART_ACTIONS = {
  PUT: 'cart/PUT',
  DELETE: 'cart/DELETE',
  SELECTIVE_DELETE: 'cart/SELECTIVE_DELETE',
  INITIALIZE: 'cart/INITIALIZE',
};

const PRODUCT_LIST_ACTIONS = {
  INITIALIZE: 'productList/INITIALIZE',
};

const ORDER_ACTIONS = {
  ADD: 'order/ADD',
  DELETE: 'order/DELETE',
  INITIALIZE: 'order/INITIALIZE',
  DECISION: 'order/DECISION',
};

// Initial State
const initState = {
  products: [],
  shoppingCart: [],
  order: [],
};

// Action Creators
export const doPutProductToCart = ({ productId, name, price, image, quantity }) => ({
  type: CART_ACTIONS.PUT,
  productId,
  name,
  price,
  image,
  quantity,
});

export const doDeleteProductFromCart = ({ productId }) => ({
  type: CART_ACTIONS.DELETE,
  productId,
});

export const doSelectiveDeleteFromCart = () => ({ type: CART_ACTIONS.SELECTIVE_DELETE });

export const doInitializeProductList = ({ products }) => ({
  type: PRODUCT_LIST_ACTIONS.INITIALIZE,
  products,
});

export const doInitializeCartList = ({ shoppingCart }) => ({
  type: CART_ACTIONS.INITIALIZE,
  shoppingCart,
});

export const doAddProductToOrder = ({ id }) => ({ type: ORDER_ACTIONS.ADD, id });

export const doDeleteProductFromOrder = ({ id }) => ({ type: ORDER_ACTIONS.DELETE, id });

export const doInitializeOrder = () => ({ type: ORDER_ACTIONS.INITIALIZE });

export const doDecideOrder = ({ orderList }) => ({ type: ORDER_ACTIONS.DECISION, orderList });

// Reducers
function cartReducer(state = initState, action) {
  switch (action.type) {
    case PRODUCT_LIST_ACTIONS.INITIALIZE:
      return {
        ...state,
        products: [...action.products],
      };

    case CART_ACTIONS.INITIALIZE:
      return {
        ...state,
        shoppingCart: [...action.shoppingCart],
      };

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
        shoppingCart: state.shoppingCart.filter(product => product.productId !== action.productId),
        order: state.order.filter(productId => productId !== action.productId),
      };

    case CART_ACTIONS.SELECTIVE_DELETE:
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

    case ORDER_ACTIONS.DECISION:
      return {
        ...state,
        orderList: action.orderList,
      };

    default:
      return state;
  }
}

export default cartReducer;
