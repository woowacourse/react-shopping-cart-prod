/* eslint-disable no-restricted-globals */
import OrderItemList from '../../components/OrderItemList';
import styles from './index.module.scss';

const mock = [
  {
    quantity: 2,
    name: 'PET보틀-밀크티(370ml)',
    totalPrice: 73400,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
  },
  {
    quantity: 3,
    name: 'PET보틀-정사각(370ml)',
    totalPrice: 41000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/fbe1660a-20f4-4077-8ce7-d8926c7b4e6d.jpg?h=300&w=300',
  },
  {
    quantity: 4,
    name: 'PET보틀-납작(450ml)',
    totalPrice: 39900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/6adcd3f3-25a3-4038-82a4-322eb72ec281.jpg?h=300&w=300',
  },
];

function Order() {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>주문 목록</h2>
      <div className={styles['order-list']}>
        <OrderItemList orderItemList={mock} orderNumber={1} />
        <OrderItemList orderItemList={mock} orderNumber={2} />
      </div>
    </main>
  );
}

export default Order;
