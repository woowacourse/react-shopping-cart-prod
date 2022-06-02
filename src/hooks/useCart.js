import { useSelector, useDispatch } from 'react-redux';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { setCart } from 'reducers/cart/cart.actions';
import { METHOD } from 'constants';
import useFetch from 'hooks/useFetch';

const useCart = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.cart);

  const { fetchApi: deleteItemApi } = useFetch({
    method: METHOD.DELETE,
    url: '/cart',
    handler: (data) => dispatch(setCart(data)),
  });

  const { fetchApi: updateItemApi } = useFetch({
    method: METHOD.PUT,
    url: '/cart',
    handler: (data) => dispatch(setCart(data)),
  });

  const { fetchApi: addItemApi } = useFetch({
    method: METHOD.POST,
    url: '/cart',
    handler: (data) => dispatch(setCart(data)),
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
