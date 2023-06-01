import { S } from './OrderCompleteItem.styles';
import useNavigatePage from '../../../hooks/useNavigatePage';

type Props = {
  order: JSX.Element | JSX.Element[];
  id: number;
};

const OrderCompleteItem = ({ order, id }: Props) => {
  const { goHome, goOrderDetail } = useNavigatePage();

  return (
    <S.Wrapper>
      <S.Title>주문이 완료되었습니다.</S.Title>
      <S.OrderWrapper>{order}</S.OrderWrapper>
      <S.ButtonWrapper>
        <S.HomeButton onClick={goHome}>홈으로 가기</S.HomeButton>
        <S.DetailButton onClick={() => goOrderDetail(id)}>주문 상세 내역 보기</S.DetailButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default OrderCompleteItem;
