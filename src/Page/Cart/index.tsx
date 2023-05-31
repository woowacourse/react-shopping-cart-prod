import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ReactComponent as AlertBlank } from 'src/assets/baemin-alert-blank.svg';
import CartProductItemList from 'src/components/CartProductItemList';
import PaymentsView from 'src/components/PaymentsView';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import ContentLayout from 'src/components/Common/ContentLayout';
import usePayments from 'src/hooks/usePayments';
import useModal from 'src/hooks/useModal';
import Modal from 'src/components/Common/Modal';
import usePurchase from 'src/hooks/usePurchase';
import { MESSAGE, ROUTE_PATH } from 'src/constants';
import styles from './index.module.scss';

function Cart() {
  const navigate = useNavigate();

  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const checekdIdList = useRecoilValue($CheckedCartIdList(currentServerUrl));

  const { isModalOpen: isFinalModalOpen, openModal: finalOpenModal, closeModal: finalCloseModal } = useModal();

  const { payments } = usePayments();
  const { purchaseCartItem, orderId } = usePurchase();

  const purchaseCallback = async () => {
    await purchaseCartItem(checekdIdList);
    finalOpenModal();
  };

  const ResultComponent =
    cartList.length > 0 ? (
      <section className={styles['main-view']}>
        <CartProductItemList />
        {payments && <PaymentsView puschaseOption paymentAmount={payments} purchaseCallback={purchaseCallback} />}
      </section>
    ) : (
      <section className={styles['main-view-blank']}>
        <AlertBlank />
        <p>장바구니가 비어있어요!</p>
      </section>
    );

  return (
    <>
      <ContentLayout title="장바구니">{ResultComponent}</ContentLayout>;
      {isFinalModalOpen && (
        <Modal closeEvent={finalCloseModal} direction="center">
          <div>
            <div>{MESSAGE.PAYMENTS_SUCCESSFUL}</div>
            <div>
              <button type="button" onClick={() => navigate(ROUTE_PATH.DEFAULT)}>
                홈으로 돌아가기
              </button>
              <button type="button" onClick={() => navigate(`${ROUTE_PATH.ORDER_DETAIL(orderId)}`)}>
                주문 내역 확인하기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Cart;
