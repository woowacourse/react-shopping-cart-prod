import {
  ADD_ALL_ITEM,
  DELETE_ALL_ITEM,
  ADD_SPECIFIC_ITEM,
  DELETE_SPECIFIC_ITEM,
} from 'redux/actions/orderList.action';

const initialState = {
  items: [],
};

function orderList(state = initialState, action) {
  switch (action.type) {
    case ADD_ALL_ITEM: {
      return {
        items: action.payload.itemList.map(item => item.productId),
      };
    }
    case DELETE_ALL_ITEM:
      return { items: [] };

    case ADD_SPECIFIC_ITEM:
      return {
        items: state.items.concat(action.payload.id),
      };

    case DELETE_SPECIFIC_ITEM:
      return {
        items: state.items.filter(id => id !== action.payload.id),
      };
    default:
      return state;
  }
}

export default orderList;
