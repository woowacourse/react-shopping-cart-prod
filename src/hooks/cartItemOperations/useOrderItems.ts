import useCart from '../useCart.ts';
import { useNavigate } from 'react-router-dom';
import usePostCreateOrder from '../requests/usePostCreateOrder.ts';
import { useEffect } from 'react';
import { useToast } from '../useToast.ts';
import toastMessages from '../../constants/toastMessages.ts';
import useModal from '../useModal.ts';

const useOrderItems = () => {
  const navigate = useNavigate();
  const { cartList, removeCartsWithId } = useCart();
  const { createOrderState, createOrder } = usePostCreateOrder();
  const showToast = useToast();
  const { closeModal } = useModal();

  const handleOrderItems = async () => {
    if (!cartList) return;

    const orderItems = cartList.filter((item) => item.isSelected).map((item) => ({ id: item.product.id, quantity: item.quantity }));

    const orderItemsWithId = cartList.filter((item) => item.isSelected).map((item) => item.id);
    const orderTime = new Date().toISOString();

    await createOrder({ body: { orderItems, orderTime } });
    removeCartsWithId(orderItemsWithId);
  };

  useEffect(() => {
    if (createOrderState.status === 'success' && createOrderState.data) {
      showToast(toastMessages.ordered);
      navigate(`/order/${createOrderState.data.orderId}`, { state: { makeOrder: createOrderState.data } });
      closeModal();
    }
  }, [createOrderState.status]);

  return { handleOrderItems, createOrderState, cartList };
};

export default useOrderItems;
