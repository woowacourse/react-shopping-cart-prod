import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import useCartList from '../../../hooks/useCartList';
import useCoupon from '../../../hooks/useCoupon';
import { couponListState } from '../../../store/coupon';
import { CouponItemType } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import styles from './style.module.css';

const OrderAddition = () => {
  const couponList = useRecoilValue(couponListState);
  const { getCartItemSum } = useCartList();
  const { fetchMyCoupon } = useCoupon();
  const money = getCartItemSum();
  const { isLoading } = useQuery<CouponItemType[]>('couponListData', () => fetchMyCoupon(money));

  return (
    <>
      <div>
        <div className={styles.modalHeader}>
          <h3>쿠폰 선택</h3>
        </div>
        <ul className={styles.couponBox}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            couponList.map((coupon) => {
              return (
                <li className={styles.couponItem}>
                  <button type="button" className={styles.couponData}>
                    <h4>{coupon.couponName}</h4>
                    <div className={styles.minimumPrice}>최소 주문금액 {coupon.minAmount}원</div>
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className={styles.resultBox}>
          <div className={styles.priceBox}>
            <div>총 상품가격</div>
            <div>{priceFormatter(money)}원</div>
          </div>
          <div className={styles.priceBox}>
            <div>총 배송비</div>
            <div>3,000원</div>
          </div>

          <div className={styles.priceResultBox}>
            <div>총 주문금액</div>
            <div>{priceFormatter(money + 3000)}원</div>
          </div>
          <button className={styles.resultOrderButton}>주문 완료하기</button>
        </div>
      </div>
    </>
  );
};

export default OrderAddition;
