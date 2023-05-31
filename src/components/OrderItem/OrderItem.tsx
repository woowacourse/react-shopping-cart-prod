/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import NextIcon from '../../assets/next-icon.svg';
import { OrderItemType } from '../../store/order';
import styles from './style.module.css';

type OrderItemProps = {
  information: OrderItemType;
  isDetail?: true;
};

const OrderItem = ({ information, isDetail }: OrderItemProps) => {
  const navigate = useNavigate();

  const navigateToOrderDetailPage = useCallback(
    (orderId: number) => () => {
      navigate(`/orderList/${orderId}`);
    },
    []
  );

  return (
    <>
      <div className={`${styles.productNumber} ${styles.orderTextStyle}`}>
        <p>주문 번호: {information.id}</p>
        {!isDetail && (
          <button type="button" onClick={navigateToOrderDetailPage(information.id)}>
            <span className={styles.orderTextStyle}>상세보기</span>
            <img className={styles.nextIcon} src={NextIcon} alt="next icon" />
          </button>
        )}
      </div>
      <div className={styles.cartItem}>
        <div>
          {information.products.map((product) => {
            return (
              <div className={styles.productItem}>
                <img className={styles.cartImage} src={product.imageUrl} alt="고기임" />
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.name}</p>
                  <div className={styles.productPrice}>수량: {product.quantity}개</div>
                </div>
                <div className={styles.itemCountDatas}></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrderItem;
