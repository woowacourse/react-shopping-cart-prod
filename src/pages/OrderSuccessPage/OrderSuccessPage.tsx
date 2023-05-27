import { useNavigate, useSearchParams } from 'react-router-dom';

import { PATH } from '../../constants/path';
import * as S from './OrderSuccessPage.styles';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <S.OrderSuccessMessageContainer>
      <S.OrderSuccessIcon />
      <S.SuccessMessageHeading size="small">주문이 완료되었습니다.</S.SuccessMessageHeading>
      <S.SuccessMessageHeading size="small">
        <span>내일 아침</span>에 만나요!
      </S.SuccessMessageHeading>
      <S.HomeButton variant="primary" onClick={() => navigate(PATH.ROOT)}>
        홈으로 이동하기
      </S.HomeButton>
      <S.OrderDetailButton
        variant="secondary"
        onClick={() => navigate(`${PATH.ORDER_DETAIL}/${orderId}`)}
      >
        주문내역 상세보기
      </S.OrderDetailButton>
    </S.OrderSuccessMessageContainer>
  );
};

export default OrderSuccessPage;
