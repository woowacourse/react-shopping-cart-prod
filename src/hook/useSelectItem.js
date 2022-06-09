import {useDispatch} from 'react-redux';
import {SELECTED_ITEM} from 'store/modules/selectedItem';

export default function useSelectItem() {
  const dispatch = useDispatch();

  const selectAllItem = (payload) => dispatch({type: SELECTED_ITEM.ADD_ALL, payload});

  const deselectAllItem = () => dispatch({type: SELECTED_ITEM.DELETE_ALL});

  const selectItem = (payload) => dispatch({type: SELECTED_ITEM.ADD, payload});

  const deselectItem = (payload) => dispatch({type: SELECTED_ITEM.DELETE, payload});

  return {
    selectAllItem,
    deselectAllItem,
    selectItem,
    deselectItem,
  };
}
