import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBoxSkeleton = () => {
  return (
    <S.BoxWrapper>
      <S.BoxContent>
        <S.InformationData>
          <S.InformationDataLabel>상품 금액</S.InformationDataLabel>
          <S.InformationDataDescription>0원</S.InformationDataDescription>
        </S.InformationData>
        <S.SubInformationData>
          <S.InformationDataLabel size="small">&#8735; 상품 할인 금액</S.InformationDataLabel>
          <S.InformationDataDescription size="small">0 원</S.InformationDataDescription>
        </S.SubInformationData>
        <S.SubInformationData>
          <S.InformationDataLabel size="small">&#8735; 등급 할인 금액</S.InformationDataLabel>
          <S.InformationDataDescription size="small">0 원</S.InformationDataDescription>
        </S.SubInformationData>
        <S.MembershipData>
          <S.MembershipRank>일반</S.MembershipRank>
          <S.InformationDataLabel size="small" as="span">
            0% 할인
          </S.InformationDataLabel>
        </S.MembershipData>
        <S.InformationData>
          <S.InformationDataLabel>배송비</S.InformationDataLabel>
          <S.InformationDataDescription>0원</S.InformationDataDescription>
        </S.InformationData>
        <S.TotalInformationData>
          <S.InformationDataLabel>결제 예정 금액</S.InformationDataLabel>
          <S.InformationDataDescription>0원</S.InformationDataDescription>
        </S.TotalInformationData>
        <Button className="loading-button" aria-label="주문하기" variant="primary" disabled>
          <Spinner size={18} width={3} disabled />
        </Button>
      </S.BoxContent>
    </S.BoxWrapper>
  );
};

export default CartCheckoutBoxSkeleton;
