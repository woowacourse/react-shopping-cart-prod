import { ChangeEvent } from 'react';
import * as S from './DiscountBox.style';
import { useSetRecoilState } from 'recoil';
import { modalContentState, modalOpenState } from '../../recoil/modalAtoms';
import { CouponModalContent } from '../CouponModalContent';

type DiscountBoxProps = {
  userPoint: number;
  point: string;
  onChangePoint: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickAllPoint: () => void;
};

const coupons = [
  {
    couponName: '첫 구매 쿠폰',
    discountPercent: 30,
    minAmount: 0,
  },
  {
    couponName: '오늘은 화이트데이니까.. 반지 선물 어때요?',
    discountPercent: 10,
    minAmount: 20000,
  },
  {
    couponName: '미리 메리크리스마스',
    discountPercent: 25,
    minAmount: 50000,
  },
];

function DiscountBox({
  userPoint,
  point,
  onChangePoint,
  onClickAllPoint,
}: DiscountBoxProps) {
  const setModalState = useSetRecoilState(modalOpenState);
  const setModalContentState = useSetRecoilState(modalContentState);

  const openModal = () => {
    setModalState(true);
    setModalContentState(<CouponModalContent coupons={coupons} />);
  };

  return (
    <S.Wrapper>
      <S.CouponWrapper>
        <S.Text>쿠폰</S.Text>
        <S.CouponInfo>적용 가능한 쿠폰이 있어요!</S.CouponInfo>
        <S.AllPointButton onClick={openModal}>조회/적용</S.AllPointButton>
      </S.CouponWrapper>
      <S.PointWrapper>
        <S.Label>포인트</S.Label>
        <S.Input type="text" value={point} onChange={onChangePoint} />
        <S.AllPointButton onClick={onClickAllPoint}>전체사용</S.AllPointButton>
      </S.PointWrapper>
      <S.UserPoint>사용 가능 포인트: {userPoint.toLocaleString()}p</S.UserPoint>
    </S.Wrapper>
  );
}

export default DiscountBox;
