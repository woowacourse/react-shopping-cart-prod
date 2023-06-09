import { useNavigate } from 'react-router-dom';

const useNavigatePage = () => {
  const navigator = useNavigate();
  const goHome = () => {
    navigator('/');
  };

  const goCart = () => {
    navigator('/cart');
  };

  const goOrder = () => {
    navigator('/orders');
  };

  const goOrderDetail = (orderId: number) => {
    navigator(`/orders/${orderId}`, { state: { id: orderId } });
  };

  const goOrderComplete = () => {
    navigator('/order-complete');
  };

  return { goHome, goCart, goOrder, goOrderDetail, goOrderComplete };
};

export default useNavigatePage;
