/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { ReactComponent as AlertBlank } from '../../assets/baemin-alert-blank.svg';
import CartProductItemList from '../../components/CartProductItemList';
import PaymentsView from '../../components/PaymentsView';
import usePaymentsData from '../../hooks/usePaymentsData';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from '../../recoil/atom';
import styles from './index.module.scss';

function Cart() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const paymentsData = usePaymentsData(currentServerUrl);
  const checkedCartIdList = useRecoilValue($CheckedCartIdList(currentServerUrl));
  const navigate = useNavigate();

  const handleOrder = () => navigate('/order-checkout');

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>MSW의 장바구니</h2>
      {cartList.length > 0 ? (
        <section className={styles['main-view']}>
          <CartProductItemList />
          <div className={styles['sticky-view']}>
            {paymentsData && (
              <div className={styles.payments}>
                <PaymentsView paymentsData={paymentsData} />
                <button
                  type="button"
                  className={styles['payments-button']}
                  onClick={handleOrder}
                  disabled={checkedCartIdList.length === 0}
                >
                  {checkedCartIdList.length}개 상품 구매하기
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className={styles['main-view-blank']}>
          <AlertBlank />
          <p>장바구니가 비어있어요!</p>
        </section>
      )}
    </main>
  );
}

export default Cart;
