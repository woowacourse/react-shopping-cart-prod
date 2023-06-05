import SubmitModalTemplate from '../../templates/SubmitModalTemplate';
import { confirmOrderModalState } from '../../../service/atom';

const ConfirmOrderModal = () => {
  return (
    <SubmitModalTemplate
      modalState={confirmOrderModalState}
      title="해당 주문을 확정하시겠습니까?"
    />
  );
};

export default ConfirmOrderModal;
