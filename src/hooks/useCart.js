import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SERVER_PATH, STORAGE_KEY } from '../constants';
import { getCartItemAsync } from '../store/cart/cart.actions';

const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

const useCart = () => {
  const dispatch = useDispatch();

  const addItem = async (id) => {
    try {
      await axios.post(`${SERVER_PATH.CARTS}/products/${id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getCartItemAsync(accessToken));
    } catch (error) {
      alert(error.response.data);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${SERVER_PATH.CARTS}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getCartItemAsync(accessToken));
    } catch (error) {
      alert(error.response.data);
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
      alert(error.response.data);
    }
  };

  return { addItem, deleteItem, updateItemQuantity };
};

export default useCart;
