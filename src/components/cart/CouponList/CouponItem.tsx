import { getFormattedPrice, getFormattedWon } from '@utils/common';
import { CouponKind } from '@type/couponType';
import * as S from './CouponItem.style';

interface CouponItemProps {
  name: string;
  discountValue: number;
  type: CouponKind;
  condition: number;
  isSelect: boolean;
  onCouponSelect: () => void;
}

function CouponItem({
  name,
  discountValue,
  condition,
  isSelect,
  type,
  onCouponSelect,
}: CouponItemProps) {
  const getConditionMessage = () => {
    if (condition > 0) {
      return `${getFormattedWon(condition)}원 이상 결제 시`;
    }

    return '모든 금액 사용 가능';
  };

  const getMainValueText = () => {
    if (type === 'delivery') return '배달비 무료!';

    return getFormattedPrice(discountValue);
  };

  const getSubText = () => {
    if (type === 'delivery') return;

    if (type === 'percent') return '%';

    return '원';
  };

  return (
    <S.Container onClick={onCouponSelect} isSelect={isSelect}>
      <S.Name>{name}</S.Name>
      <div>
        <S.MainValueText>{getMainValueText()}</S.MainValueText>
        <S.SubText>{getSubText()}</S.SubText>
      </div>
      <S.Condition>{getConditionMessage()}</S.Condition>
    </S.Container>
  );
}

export default CouponItem;
