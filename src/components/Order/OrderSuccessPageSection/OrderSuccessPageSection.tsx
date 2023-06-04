import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import OrderSuccess from '../../../assets/order-success.svg';
import { MAIN_PAGE_LOCATE, ORDER_INFORMATION_PAGE_LOCATE } from '../../../constants';
import styles from './style.module.css';

const OrderSuccessPageSection = () => {
  const loaction = useLocation();
  const navigate = useNavigate();
  const orderId = loaction.state.id;

  const handleNavigateMainPage = useCallback(() => {
    navigate(MAIN_PAGE_LOCATE);
  }, [navigate]);

  const handleNavigateOrderPage = useCallback(() => {
    navigate(ORDER_INFORMATION_PAGE_LOCATE, { state: { id: orderId } });
  }, [navigate, orderId]);

  return (
    <>
      <div className={styles.mainDiv}>
        <img src={OrderSuccess} alt="주문성공" className={styles.orderSuccessSVG} />
        <div className={styles.buttonBox}>
          <button
            type="button"
            className={styles.orderResultButton}
            onClick={handleNavigateOrderPage}
          >
            주문 결과 확인하기
          </button>

          <button type="button" className={styles.mainPageButton} onClick={handleNavigateMainPage}>
            메인 화면으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
};
export default OrderSuccessPageSection;
