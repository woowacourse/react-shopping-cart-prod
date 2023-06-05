import SubmitModalTemplate from '../../templates/SubmitModalTemplate';
import { deleteOrderModalState } from '../../../service/atom';

const DeleteOrderModal = () => {
  return (
    <SubmitModalTemplate modalState={deleteOrderModalState} title="해당 주문을 취소하시겠습니까?" />
  );
};

export default DeleteOrderModal;
