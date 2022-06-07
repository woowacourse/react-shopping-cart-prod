import { useSelector, useDispatch } from 'react-redux';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { METHOD } from 'constants';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';

const useCart = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.cart);

  const { isSucceed: isDeleteItemSucceed, fetchApi: deleteItemApi } = useFetch({
    method: METHOD.DELETE,
    url: '/cart',
  });

  const { isSucceed: isUpdateItemSucceed, fetchApi: updateItemApi } = useFetch({
    method: METHOD.PUT,
    url: '/cart',
  });

  const { isSucceed: isAddItemSucceed, fetchApi: addItemApi } = useFetch({
    method: METHOD.POST,
    url: '/cart',
  });

  const getItems = () => {
    dispatch(getCartItemAsync);
  };

  const deleteItem = (id) => {
    deleteItemApi({ params: id });
  };

  const deleteItems = (idList) => {
    Promise.all(idList.map((id) => deleteItemApi(id)));
  };

  const updateItemQuantity = (id, quantity) => {
    updateItemApi({ params: `${id}/${quantity}` });
  };

  const addItem = (id) => {
    addItemApi({ params: id });
  };

  useEffect(() => {
    if (isAddItemSucceed) getItems();
  }, [isAddItemSucceed]);

  useEffect(() => {
    if (isUpdateItemSucceed) getItems();
  }, [isUpdateItemSucceed]);

  useEffect(() => {
    if (isDeleteItemSucceed) getItems();
  }, [isDeleteItemSucceed]);

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
