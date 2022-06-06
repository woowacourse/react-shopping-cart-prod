import Modal from '@/components/common/Modal/Modal';
import { ROUTE } from '@/route';
import { DefaultStyled } from 'juunzzi-payments';
import { useNavigate } from 'react-router-dom';

function Payments({ children }) {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(ROUTE.ShoppingCart);
  };
  return (
    <Modal closeModal={closeModal}>
      <DefaultStyled>{children}</DefaultStyled>
    </Modal>
  );
}

export default Payments;
