import { useRecoilValue } from 'recoil';
import { ReactComponent as AlertBlank } from '../../assets/baemin-alert-blank.svg';
import CartProductItemList from '../../components/CartProductItemList';
import PaymentsView from '../../components/PaymentsView';
import usePaymentsData from '../../hooks/usePaymentsData';
import { $CartList, $CurrentServerUrl } from '../../recoil/atom';
import styles from './index.module.scss';

function Cart() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const paymentsData = usePaymentsData(currentServerUrl);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>장바구니</h2>
      {cartList.length > 0 ? (
        <section className={styles['main-view']}>
          <CartProductItemList />
          {paymentsData && <PaymentsView paymentsData={paymentsData} />}
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
