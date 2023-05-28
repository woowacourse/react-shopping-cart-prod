import { useRecoilValue } from 'recoil';
import { ReactComponent as AlertBlank } from 'src/assets/baemin-alert-blank.svg';
import CartProductItemList from 'src/components/CartProductItemList';
import PaymentsView from 'src/components/PaymentsView';
import { PARCEL_PRICE } from 'src/constants';
import { $CartList, $CurrentServerUrl } from 'src/recoil/atom';
import $CheckedCartTotalPrice from 'src/recoil/selector';
import styles from './index.module.scss';

function Cart() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const totalPrice = useRecoilValue($CheckedCartTotalPrice(currentServerUrl));

  const ResultComponent =
    cartList.length > 0 ? (
      <section className={styles['main-view']}>
        <CartProductItemList />
        <PaymentsView priceTotal={totalPrice} parcelPrice={PARCEL_PRICE} />
      </section>
    ) : (
      <section className={styles['main-view-blank']}>
        <AlertBlank />
        <p>장바구니가 비어있어요!</p>
      </section>
    );

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>장바구니</h2>
      {ResultComponent}
    </main>
  );
}

export default Cart;
