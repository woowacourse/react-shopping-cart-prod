import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doAddProductToOrder, doDeleteProductFromOrder } from 'reducers/cart.reducer';

const useOrder = id => {
  const dispatch = useDispatch();
  const { order } = useSelector(state => state.cartReducer);
  const [isInOrder, setIsInOrder] = useState(order.some(productId => productId === id));

  useEffect(() => {
    setIsInOrder(order.some(productId => productId === id));
  }, [order, id]);

  const updateOrder = () => {
    if (isInOrder) {
      dispatch(doDeleteProductFromOrder({ id }));
    } else {
      dispatch(doAddProductToOrder({ id }));
    }
  };

  return [isInOrder, updateOrder];
};

export default useOrder;
