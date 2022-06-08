import { useSelector, useDispatch } from 'react-redux';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { METHOD } from 'constants';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';
import {
  updateCartItemQuantityAction,
  deleteCartItemAction,
  deleteCartItemsAction,
} from 'reducers/cart/cart.actions';

const useCart = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.cart);

  const { fetchApi: deleteItemApi } = useFetch({
    method: METHOD.DELETE,
    url: '/api/members/me/carts',
  });

  const { fetchApi: updateItemApi } = useFetch({
    method: METHOD.PUT,
    url: '/api/members/me/carts',
  });

  const { isSucceed: isAddItemSucceed, fetchApi: addItemApi } = useFetch({
    method: METHOD.POST,
    url: '/api/members/me/carts',
  });

  const getItems = () => {
    dispatch(getCartItemAsync);
  };

  const deleteItem = (id) => {
    deleteItemApi({ params: id }).then(() => {
      dispatch(deleteCartItemAction(id));
    });
  };

  const deleteItems = (idList) => {
    Promise.all(idList.map((id) => deleteItemApi({ params: id }))).then(() => {
      dispatch(deleteCartItemsAction(idList));
    });
  };

  const updateItemQuantity = (id, quantity) => {
    updateItemApi({ params: id, payload: { quantity } }).then(() => {
      dispatch(updateCartItemQuantityAction(id, quantity));
    });
  };

  const addItem = (productId) => {
    addItemApi({ payload: { productId, quantity: 1 } });
  };

  useEffect(() => {
    if (isAddItemSucceed) getItems();
  }, [isAddItemSucceed]);

  return {
    isLoading,
    isError,
    getItems,
    deleteItem,
    deleteItems,
    updateItemQuantity,
    addItem,
    cartItems: data,
  };
};

export default useCart;
