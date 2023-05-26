import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function ErrorPage() {
  return (
    <Wrapper>
      <Image src="./404.svg" />
      <Title>페이지를 찾지 못했어요.</Title>
      <Message>주소에 오타가 있거나, </Message>
      <Message>변경, 삭제되었을 수도 있어요!</Message>
      <StyledLink to="/">홈으로 가기</StyledLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 16px;
`;

const Image = styled.img`
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin: 32px 0;

  font-size: 28px;
`;

const Message = styled.p`
  margin: 8px 0;

  font-size: 16px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 160px;
  height: 44px;
  margin: 64px 0;

  background-color: #04c09e;
  border-radius: 8px;

  color: #ffffff;
`;
