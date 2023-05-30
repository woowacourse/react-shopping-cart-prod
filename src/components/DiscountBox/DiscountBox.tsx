import { ChangeEvent } from 'react';
import * as S from './DiscountBox.style';

type DiscountBoxProps = {
  userPoint: number;
  point: string;
  onChangePoint: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickAllPoint: () => void;
};

function DiscountBox({
  userPoint,
  point,
  onChangePoint,
  onClickAllPoint,
}: DiscountBoxProps) {
  return (
    <S.Wrapper>
      <S.CouponWrapper>
        <S.Text>쿠폰</S.Text>
        <S.AllPointButton>조회/적용</S.AllPointButton>
      </S.CouponWrapper>
      <S.PointWrapper>
        <S.Label>
          포인트
          <S.Input type="text" value={point} onChange={onChangePoint} />
        </S.Label>
        <S.AllPointButton onClick={onClickAllPoint}>전체사용</S.AllPointButton>
      </S.PointWrapper>
      <S.UserPoint>사용 가능 포인트: {userPoint.toLocaleString()}p</S.UserPoint>
    </S.Wrapper>
  );
}

export default DiscountBox;
