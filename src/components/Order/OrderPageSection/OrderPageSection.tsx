import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { ORDER_INFORMATION_PAGE_LOCATE } from '../../../constants';
import useOrders from '../../../hooks/useOrders';
import { orderListState } from '../../../store/order';
import { OrderItemListType } from '../../../types';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import styles from './style.module.css';

const OrderPageSection = () => {
  const orderList = useRecoilValue(orderListState);
  const { fetchOrderList } = useOrders();
  const { isLoading } = useQuery<OrderItemListType[]>('couponList', fetchOrderList);

  const navigate = useNavigate();

  const navigateToOrderInformationPage = useCallback(() => {
    navigate(ORDER_INFORMATION_PAGE_LOCATE);
  }, [navigate]);

  return (
    <>
      <div className={styles.OrderListHeader}>주문목록</div>
      <hr />
      {isLoading && <LoadingSpinner />}
      {orderList.map((listItem) => {
        return (
          <div className={styles.OrderItemBox} key={listItem.id}>
            <div className={styles.OrderItemHeader}>
              <div>주문번호: {listItem.id}</div>
              <button type="button" onClick={navigateToOrderInformationPage}>
                상세보기
              </button>
            </div>
            {listItem.products.map((item) => {
              return (
                <div className={styles.OrderItemData} key={item.id}>
                  <img src={item.imgUrl} alt="상품예시" />
                  <div>
                    <div>{item.name}</div>
                    <div>
                      {item.price}원 / 수량 : {item.quantity}개
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default OrderPageSection;
