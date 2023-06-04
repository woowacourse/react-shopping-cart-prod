import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { ORDER_SUCCESS_PAGE } from '../../../constants';
import useCartList from '../../../hooks/useCartList';
import useCoupon from '../../../hooks/useCoupon';
import useDiscount from '../../../hooks/useDiscount';
import useOrders from '../../../hooks/useOrders';
import { couponListState } from '../../../store/coupon';
import { CouponItemType } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Alert from '../../utils/Alert/Alert';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';
import styles from './style.module.css';

const OrderAddition = () => {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [couponState, setCouponState] = useState(0);
  const couponList = useRecoilValue(couponListState);

  const { getCartItemSum, getCheckedCartItems } = useCartList();
  const { fetchMyCoupon, setCheckCoupon } = useCoupon();
  const { resultPrice, discountPrice, getDiscountPrice, fetchBuyItems } = useOrders();
  const money = getCartItemSum();
  const { isLoading } = useQuery<CouponItemType[]>('couponListData', () => fetchMyCoupon(money));
  const { mainPrice, deliveryPrice } = useDiscount();

  const handleAlertAccept = useCallback(
    (couponId: number) => {
      setCheckCoupon(couponId);
      setIsAlertOpen(false);
      getDiscountPrice(getCartItemSum(), couponState);
    },
    [setCheckCoupon, getDiscountPrice, getCartItemSum, couponState]
  );

  const handleAlertCancel = useCallback(() => {
    setCouponState(0);
    setIsAlertOpen(false);
  }, []);

  const handleCouponDecide = useCallback((couponId: number) => {
    setCouponState(couponId);
    setIsAlertOpen(true);
  }, []);

  const handleBuyDecide = useCallback(() => {
    fetchBuyItems({
      products: getCheckedCartItems(),
      totalProductAmount: getCartItemSum(),
      deliveryAmount: 3000,
      address: '서울특별시 송파구 송파송파송파송파송파송파',
      couponId: couponState,
    }).then((result) => {
      if (result.ok) {
        navigate(ORDER_SUCCESS_PAGE, { state: { id: result.body } });
      }
    });
  }, [couponState, fetchBuyItems, getCartItemSum, getCheckedCartItems, navigate]);

  return (
    <>
      {isAlertOpen &&
        createPortal(
          <Alert
            text="쿠폰을 적용하시겠습니까?"
            handleAccept={() => {
              handleAlertAccept(couponState);
            }}
            handleCancel={handleAlertCancel}
          />,
          document.body
        )}
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
                <li
                  className={styles.couponItem}
                  onClick={() => {
                    coupon.isSelected ?? handleCouponDecide(coupon.couponId);
                  }}
                >
                  <button type="button" className={styles.couponData} disabled={coupon.isSelected}>
                    <h4>{coupon.couponName}</h4>
                    <div className={styles.minimumPrice}>최소 주문금액 {coupon.minAmount}원</div>
                  </button>
                  {coupon.isSelected && (
                    <input type="checkbox" disabled className={styles.checkbox} />
                  )}
                </li>
              );
            })
          )}
        </ul>

        <div className={styles.resultBox}>
          <div className={styles.priceBox}>
            <div>총 상품가격</div>
            <div>{priceFormatter(mainPrice)}원</div>
          </div>
          <div className={styles.priceBox}>
            <div>총 배송비</div>
            <div>{priceFormatter(deliveryPrice)}원</div>
          </div>

          <div>
            <div className={styles.priceResultDiscount}>
              <div>총 할인금액</div>
              <div>{priceFormatter(discountPrice)}원</div>
            </div>
            <div className={styles.priceResultBox}>
              <div>총 주문금액</div>
              <div>{priceFormatter(resultPrice)}원</div>
            </div>
          </div>
          <button className={styles.resultOrderButton} type="button" onClick={handleBuyDecide}>
            주문 완료하기
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderAddition;
