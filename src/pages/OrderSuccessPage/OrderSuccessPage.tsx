import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Heading from '../../components/common/Heading/Heading';
import { PATH } from '../../constants/path';
import * as S from './OrderSuccessPage.styles';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const handleOrderDetailButtonClick = useCallback(() => {
    navigate(`${PATH.ORDER}/${orderId}`);
  }, [navigate, orderId]);

  return (
    <S.OrderSuccessMessageContainer>
      <S.OrderSuccessIcon />
      <Heading size="small">주문이 완료되었습니다.</Heading>
      <Heading size="small">
        <span>내일 아침</span>에 만나요!
      </Heading>
      <S.OrderSuccessIdText>주문번호 {orderId}</S.OrderSuccessIdText>
      <S.HomeButton variant="primary" onClick={() => navigate(PATH.ROOT)}>
        쇼핑 계속하기
      </S.HomeButton>
      <S.OrderDetailButton variant="secondary" onClick={handleOrderDetailButtonClick}>
        주문내역 상세보기
      </S.OrderDetailButton>
    </S.OrderSuccessMessageContainer>
  );
};

export default OrderSuccessPage;
