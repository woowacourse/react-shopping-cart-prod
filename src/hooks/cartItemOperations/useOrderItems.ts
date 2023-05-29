import useCart from '../useCart.ts';
import { useNavigate } from 'react-router-dom';
import usePostCreateOrder from '../requests/usePostCreateOrder.ts';
import { useEffect } from 'react';

const useOrderItems = () => {
  const navigate = useNavigate();
  const { cartList } = useCart();
  const { createOrderState, createOrder } = usePostCreateOrder();

  const handleOrderItems = async () => {
    if (!cartList) return;

    const orderItems = cartList.filter((item) => item.isSelected).map((item) => ({ id: item.product.id, quantity: item.quantity }));

    createOrder({ body: { orderItems } });
  };

  useEffect(() => {
    if (createOrderState.status === 'success' && createOrderState.data) {
      navigate(`/order/${createOrderState.data.orderId}`, { state: { makeOrder: createOrderState.data } });
    }
  }, [createOrderState.status]);

  return { handleOrderItems, createOrderState };
};

export default useOrderItems;
