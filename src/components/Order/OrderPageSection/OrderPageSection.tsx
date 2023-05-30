import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ORDER_INFORMATION_PAGE_LOCATE } from '../../../constants';
import styles from './style.module.css';

const mockData = ['', '', ''];

const OrderPageSection = () => {
  const navigate = useNavigate();

  const navigateToOrderInformationPage = useCallback(() => {
    navigate(ORDER_INFORMATION_PAGE_LOCATE);
  }, [navigate]);

  return (
    <>
      <div className={styles.OrderListHeader}>주문목록</div>
      <hr />
      {mockData.map((item, index) => {
        return (
          <div className={styles.OrderItemBox}>
            <div className={styles.OrderItemHeader}>
              <div>주문번호: {index + 1}</div>
              <button type="button" onClick={navigateToOrderInformationPage}>
                상세보기
              </button>
            </div>
            <div className={styles.OrderItemData}>
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                alt="상품예시"
              />
              <div>
                <div>친환경 실링용기-ECO 19153</div>
                <div>180,600원 / 수량 : 3개</div>
              </div>
            </div>
            <div className={styles.OrderItemData}>
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                alt="상품예시"
              />
              <div>
                <div>친환경 실링용기-ECO 19153</div>
                <div>180,600원 / 수량 : 3개</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderPageSection;
