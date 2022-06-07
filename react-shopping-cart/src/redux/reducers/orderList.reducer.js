import {
  ADD_ALL_ITEM,
  DELETE_ALL_ITEM,
  ADD_SPECIFIC_ITEM,
  DELETE_SPECIFIC_ITEM,
} from 'redux/actions/orderList.action';

const initialState = {
  total: 0,
  items: [],
};

function orderList(state = initialState, action) {
  switch (action.type) {
    case ADD_ALL_ITEM: {
      console.log(action.payload);
      return {
        items: action.payload.itemList.map(item => item.id),
        total: action.payload.itemList.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0),
      };
    }
    case DELETE_ALL_ITEM:
      return { items: [], total: 0 };

    case ADD_SPECIFIC_ITEM:
      return {
        items: state.items.concat(action.payload.id),
        total: action.payload.price * action.payload.quantity,
      };

    case DELETE_SPECIFIC_ITEM:
      return { ...state, items: state.items.filter(id => id !== action.payload.id) };

    default:
      return state;
  }
}

export default orderList;
