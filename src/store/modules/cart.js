export const CART = {
  INITIALIZE: 'INITIALIZE_CART',
  ADD: 'ADD_CART',
  DELETE: 'DELETE_CART',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  DELETE_SELECTED_CART: 'DELETE_SELECTED_CART',
};

const INITIAL_STATE = {
  cart: [],
};
Object.freeze(INITIAL_STATE);
Object.freeze(INITIAL_STATE.cart);

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CART.INITIALIZE: {
      const fetchedData = action.payload;
      const newState = fetchedData.map((item) => ({
        ...item,
        quantity: 1,
      }));
      return {
        cart: [...newState],
      };
    }

    case CART.ADD: {
      return {
        cart: [...state.cart, action.payload],
      };
    }
    case CART.DELETE: {
      const id = action.payload;
      const newState = state.cart.filter((item) => item.id !== id);

      return {cart: newState};
    }
    case CART.INCREASE_QUANTITY: {
      const id = action.payload;
      const newState = state.cart.map((item) =>
        item.id === id ? {...item, quantity: Math.min(item.quantity + 1, 99)} : item,
      );

      return {
        cart: newState,
      };
    }
    case CART.DECREASE_QUANTITY: {
      const id = action.payload;
      const newState = state.cart.map((item) =>
        item.id === id ? {...item, quantity: Math.max(item.quantity - 1, 1)} : item,
      );

      return {
        cart: newState,
      };
    }
    case CART.DELETE_SELECTED_CART: {
      const selectedCartItem = action.payload;
      const newState = state.cart.filter((item) => !selectedCartItem.includes(item.id));

      return {
        cart: newState,
      };
    }
    default:
      return state;
  }
}
