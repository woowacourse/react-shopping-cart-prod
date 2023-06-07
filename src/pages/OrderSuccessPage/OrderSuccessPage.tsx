import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../components/common/Button/Button';
import Heading from '../../components/common/Heading/Heading';
import { Text } from '../../components/common/Text/Text.styles';
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
    <S.InformationContainer>
      <S.SuccessIcon />
      <Heading size="small">주문이 완료되었습니다.</Heading>
      <Heading size="small">
        <span>내일 아침</span>에 만나요!
      </Heading>
      <Text css={S.messageStyle}>주문번호 {orderId}</Text>
      <Button css={S.homeButtonStyle} variant="primary" onClick={() => navigate(PATH.ROOT)}>
        쇼핑 계속하기
      </Button>
      <Button css={S.detailButtonStyle} variant="secondary" onClick={handleOrderDetailButtonClick}>
        주문내역 상세보기
      </Button>
    </S.InformationContainer>
  );
};

export default OrderSuccessPage;
