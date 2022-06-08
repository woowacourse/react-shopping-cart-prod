// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';

const useTotalPrice = () => {
  const { isLoading, isAuthenticated } = useSelector(state => state.authReducer);
  const { shoppingCart, order } = useSelector(state => state.cartReducer);
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    let total = 0;
    order.forEach(id => {
      const product = shoppingCart.find(product => product.productId === id);
      if (product) {
        const { price, quantity } = product;
        total += price * quantity;
      }
    });
    return total;
  }, [shoppingCart, order]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
      navigate('/login');
    }
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice, isAuthenticated, isLoading, navigate, renderSnackbar]);

  return { totalPrice };
};

export default useTotalPrice;
