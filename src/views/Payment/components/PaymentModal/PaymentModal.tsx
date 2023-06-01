import { Modal } from '@common/Modal';
import { useCart } from '@views/Cart/recoil/cartState';

interface PaymentModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

function PaymentModal({ isOpen, closeModal }: PaymentModalProps) {
  const { cart } = useCart();

  // return isOpen ? (
  //   <Modal isOpen={isOpen} closeModal={closeModal}>
  //     {cart.map((item) => {

  //     })}
  //   </Modal>
  // ) : null;
}

export default PaymentModal;
