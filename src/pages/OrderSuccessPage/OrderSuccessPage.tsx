import { generatePath, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { TickCircleCheckedIcon } from '../../assets';
import { Button } from '../../components/common/Button/Button.styles';
import { Divider } from '../../components/common/Divider/Divider.styles';
import { Text } from '../../components/common/Text/Text.styles';
import { PATH } from '../../constants/path';
import { memberInformationState } from '../../store/member';
import { priceFormatter } from '../../utils/formatter';
import * as S from './OrderSuccessPage.style';

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { id: memberId } = useRecoilValue(memberInformationState);
  const [searchParams] = useSearchParams();

  const orderId = String(searchParams).split('=')[1];

  return (
    <S.Container>
      <S.CheckedIconWrapper>
        <TickCircleCheckedIcon width="60px" />
      </S.CheckedIconWrapper>
      <S.OrderSuccessTextContainer>
        <S.OrderSuccessText>{memberId}님의 주문이 완료되었습니다.</S.OrderSuccessText>
        <S.OrderSuccessText>내일 아침에 만나요!</S.OrderSuccessText>
      </S.OrderSuccessTextContainer>
      <Divider />
      <S.ButtonContainer>
        <Button variant="primary" onClick={() => navigate(PATH.ROOT)}>
          홈으로 이동하기
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(generatePath(PATH.ORDERS_OrderId, { orderId }))}
        >
          주문내역 상세보기
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
};
