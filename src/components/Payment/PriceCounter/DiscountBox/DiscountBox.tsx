import { ChangeEvent, useEffect } from 'react';
import * as S from './DiscountBox.style';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { modalContentState, modalOpenState } from '../../../../recoil/modalAtoms';
import { CouponModalContent } from '../../../ModalContent/CouponModalContent';
import { memberAuthorization } from '../../../../recoil/userAtoms';
import { serverState } from '../../../../recoil/serverAtom';
import useGetQuery from '../../../../hooks/useGetQuery';
import { Coupon } from '../../../../types/types';
import { fetchCouponList } from '../../../../api/fetcher';
import {
  couponAppliedPriceSelector,
  couponState,
  pointState,
  totalPaymentPriceSelector,
} from '../../../../recoil/orderAtom';
import { LoadingSpinner } from '../../../@common/LoadingSpinner';
import { isNumber } from '../../../../utils/validation';

type DiscountBoxProps = {
  userPoint: number;
};

function DiscountBox({ userPoint }: DiscountBoxProps) {
  const [point, setPoint] = useRecoilState(pointState);
  const setModalState = useSetRecoilState(modalOpenState);
  const setModalContentState = useSetRecoilState(modalContentState);
  const maxAvailablePoint = useRecoilValue(couponAppliedPriceSelector);
  const totalPrice = useRecoilValue(totalPaymentPriceSelector);
  const [currentCoupon, setCurrentCoupon] = useRecoilState(couponState);
  const memberAuth = useRecoilValue(memberAuthorization);
  const server = useRecoilValue(serverState);
  const { data: coupons, loading } = useGetQuery<Coupon[]>({
    fetcher: () => fetchCouponList({ server, auth: memberAuth }),
  });

  const onChangePoint = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === '') {
      setPoint('');
      return;
    }
    if (!isNumber(value)) return;
    if (Number(value) > userPoint) setPoint(String(userPoint));
    else if (Number(value) > maxAvailablePoint) setPoint(String(maxAvailablePoint));
    else setPoint(value);
  };

  const onClickAllPoint = () => {
    if (userPoint > maxAvailablePoint) setPoint(String(maxAvailablePoint));
    else setPoint(String(userPoint));
  };

  useEffect(() => {
    return () => {
      setCurrentCoupon(null);
      setPoint('');
    };
  }, []);

  const openModal = () => {
    setModalState(true);
    if (!coupons) return;
    setModalContentState(<CouponModalContent coupons={coupons} />);
  };

  const deleteCoupon = () => {
    setCurrentCoupon(null);
  };

  return (
    <S.Wrapper>
      <S.CouponWrapper>
        <S.Text>쿠폰</S.Text>
        {loading ? (
          <S.Skeleton>
            <LoadingSpinner $width={20} $height={20} />
          </S.Skeleton>
        ) : (
          <>
            <S.CouponInfo>
              {currentCoupon && (
                <>
                  <S.CouponName>{currentCoupon?.couponName}</S.CouponName>
                  <S.DeleteCouponButton onClick={deleteCoupon}>x</S.DeleteCouponButton>
                </>
              )}
              {!currentCoupon &&
                coupons &&
                totalPrice !== 0 &&
                coupons.some((coupon) => coupon.minAmount <= totalPrice) &&
                '사용 가능한 쿠폰이 있어요!'}
              {!currentCoupon &&
                coupons &&
                coupons.every((coupon) => coupon.minAmount > totalPrice) &&
                '사용 가능한 쿠폰이 없습니다.'}
            </S.CouponInfo>
            <S.AllPointButton onClick={openModal}>조회/적용</S.AllPointButton>
          </>
        )}
      </S.CouponWrapper>
      <S.PointWrapper>
        <S.Label>포인트</S.Label>
        <S.Input type='text' value={point} onChange={onChangePoint} />
        <S.AllPointButton onClick={onClickAllPoint}>전체사용</S.AllPointButton>
      </S.PointWrapper>
      <S.UserPoint>사용 가능 포인트: {userPoint.toLocaleString()}p</S.UserPoint>
    </S.Wrapper>
  );
}

export default DiscountBox;
