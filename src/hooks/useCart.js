import { useSelector, useDispatch } from 'react-redux';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { METHOD } from 'constants';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';
import { getAuthorizedHeaders } from 'api/auth';

const useCart = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.cart);

  const { isSucceed: isDeleteItemSucceed, fetchApi: deleteItemApi } = useFetch({
    method: METHOD.DELETE,
    url: '/api/members/me/carts',
  });

  const { isSucceed: isUpdateItemSucceed, fetchApi: updateItemApi } = useFetch({
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
    const headers = getAuthorizedHeaders();
    deleteItemApi({ params: id, payload: { headers } });
  };

  const deleteItems = (idList) => {
    const headers = getAuthorizedHeaders();
    Promise.all(
      idList.map((id) => deleteItemApi({ params: id, payload: { headers } })),
    );
  };

  const updateItemQuantity = (id, quantity) => {
    const headers = getAuthorizedHeaders();
    updateItemApi({ params: id, payload: { quantity, headers } });
  };

  const addItem = (product_id) => {
    const headers = getAuthorizedHeaders();
    addItemApi({ payload: { product_id, headers } });
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
