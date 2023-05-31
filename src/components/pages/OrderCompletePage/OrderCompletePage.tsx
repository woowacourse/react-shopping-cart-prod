import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import baemin from '../../../assets/image/baemin.png';
import { RewardIcon } from '../../../assets/svg';

const OrderCompletePage = () => {
  return (
    <Container>
      <Title>주문을 완료했어요.</Title>
      <Image src={baemin} alt="배달의민족 로고" />
      <Detail>
        <DetailInner>
          <dt>총 주문금액</dt>
          <dd>40,200원</dd>
        </DetailInner>
        <DetailInner>
          <dt>적립 포인트</dt>
          <dd>+ 1,000원</dd>
        </DetailInner>
        <DetailInner>
          <dt>보유 포인트</dt>
          <PointWrapper>
            <RewardIcon />
            <dd>1,000원</dd>
          </PointWrapper>
        </DetailInner>
      </Detail>
      <LinkContainer>
        <StyledLink to={'/'}>메인 페이지로 이동</StyledLink>
        {/* TODO: navigate to order detail by orderId */}
        <StyledLink to={'/'}>주문 상세 내역 보기</StyledLink>
      </LinkContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  row-gap: 20px;
`;

const Title = styled.h2`
  font-weight: 600;
`;

const Image = styled.img`
  width: 180px;
`;

const Detail = styled.dl`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 370px;
  padding: 20px 30px;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 8px;

  & > div:not(:first-child) > dd {
    font-weight: 600;
    color: ${(props) => props.theme.color.primary};
  }
`;

const DetailInner = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    font-family: 'Noto Sans KR';
    font-size: 16px;
    line-height: 27px;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
`;

const PointWrapper = styled.div`
  width: 83px;
  display: flex;
  justify-content: space-between;

  & > dd {
    font-weight: 600;
    color: ${(props) => props.theme.color.primary};
  }
`;

const LinkContainer = styled.div`
  display: flex;
  column-gap: 10px;

  & > *:first-child {
    background-color: ${(props) => props.theme.color.white};
    color: ${(props) => props.theme.color.primary};
    border: 1px solid ${(props) => props.theme.color.primary};
  }

  & > * {
    background-color: ${(props) => props.theme.color.primary};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.color.white};
`;

export default OrderCompletePage;
