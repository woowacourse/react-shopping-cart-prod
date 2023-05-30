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
    navigator('/order');
  };

  const goOrderDetail = (orderId: number) => {
    navigator(`/order/${orderId}`);
  };

  return { goHome, goCart, goOrder, goOrderDetail };
};

export default useNavigatePage;
