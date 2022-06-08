import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MESSAGE, SERVER_PATH, STORAGE_KEY } from '../constants';
import { getCartItemAsync } from '../store/cart/cart.actions';

const useCart = () => {
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const addItem = async (id) => {
    try {
      await axios.post(`${SERVER_PATH.CARTS}/products/${id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getCartItemAsync(accessToken));
      alert(MESSAGE.ADD);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const deleteItem = async (id, isAlert) => {
    try {
      await axios.delete(`${SERVER_PATH.CARTS}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getCartItemAsync(accessToken));
      isAlert && alert(MESSAGE.REMOVE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const updateItemQuantity = async (id, quantity) => {
    try {
      await axios.patch(
        `${SERVER_PATH.CARTS}/products/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(getCartItemAsync(accessToken));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleCartItem = (id, isCart) => {
    if (isCart) {
      const isAlert = true;
      deleteItem(id, isAlert);
      return;
    }
    addItem(id);
  };

  useEffect(() => {
    if (accessToken) {
      console.log('useCart');
      dispatch(getCartItemAsync(accessToken));
    }
  }, []);

  return { deleteItem, updateItemQuantity, handleCartItem };
};

export default useCart;
