/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';
import { ReactComponent as AlertBlank } from '../../assets/baemin-alert-blank.svg';
import CartProductItemList from '../../components/CartProductItemList';
import PaymentsView from '../../components/PaymentsView';
import useMutation from '../../hooks/useMutation';
import usePaymentsData from '../../hooks/usePaymentsData';
import useToast from '../../hooks/useToast';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from '../../recoil/atom';
import styles from './index.module.scss';

function Cart() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const paymentsData = usePaymentsData(currentServerUrl);
  const checkedCartIdList = useRecoilValue($CheckedCartIdList(currentServerUrl));
  const Toast = useToast();
  const { mutateQuery } = useMutation({
    onSuccess: () => {
      Toast.success('체크한 상품을 주문했습니다!');
    },
  });

  const handleOrder = async () => {
    await mutateQuery({
      url: '/orders',
      method: 'POST',
      bodyData: {
        cartItemIds: checkedCartIdList,
      },
    });
  };

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>장바구니</h2>
      {cartList.length > 0 ? (
        <section className={styles['main-view']}>
          <CartProductItemList />
          {paymentsData && <PaymentsView paymentsData={paymentsData} handleOrder={handleOrder} />}
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
