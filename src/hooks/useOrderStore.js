// @ts-nocheck
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doDeleteProductFromOrder, doAddProdcutToOrder } from 'modules/cart';

const useOrderStore = id => {
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
      dispatch(doAddProdcutToOrder({ id }));
    }
  };

  return [isInOrder, updateOrder];
};

export default useOrderStore;
