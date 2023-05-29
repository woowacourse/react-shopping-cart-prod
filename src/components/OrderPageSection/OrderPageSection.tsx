import OrderList from '../OrderList/OrderList';
import styles from './style.module.css';

const OrderPageSection = () => {
  return (
    <>
      <div className={styles.cartLstHeader}>주문목록</div>
      <hr />
      <OrderList />
    </>
  );
};

export default OrderPageSection;
