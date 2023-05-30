import useCart from '../useCart.ts';
import { useNavigate } from 'react-router-dom';
import usePostCreateOrder from '../requests/usePostCreateOrder.ts';
import { useEffect } from 'react';
import { useToast } from '../useToast.ts';
import toastMessages from '../../constants/toastMessages.ts';

const useOrderItems = () => {
  const navigate = useNavigate();
  const { cartList, removeCartsWithId } = useCart();
  const { createOrderState, createOrder } = usePostCreateOrder();
  const showToast = useToast();

  const handleOrderItems = async () => {
    if (!cartList) return;

    const orderItems = cartList.filter((item) => item.isSelected).map((item) => ({ id: item.product.id, quantity: item.quantity }));

    const orderItemsWithId = cartList.filter((item) => item.isSelected).map((item) => item.id);

    await createOrder({ body: { orderItems } });
    removeCartsWithId(orderItemsWithId);
  };

  useEffect(() => {
    if (createOrderState.status === 'success' && createOrderState.data) {
      showToast(toastMessages.ordered);
      navigate(`/order/${createOrderState.data.orderId}`, { state: { makeOrder: createOrderState.data } });
    }
  }, [createOrderState.status]);

  return { handleOrderItems, createOrderState };
};

export default useOrderItems;
