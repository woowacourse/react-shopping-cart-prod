import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Box from 'components/@common/Box';
import emptyDataImg from 'assets/empty-data.png';
import ROUTE_PATH from 'constants/routePath';
import { PropsWithChildren } from 'react';

const EmptyDataCard = ({ children }: PropsWithChildren) => {
  return (
    <Background sizing={{ width: '100%' }} flex={{ flexDirection: 'column', gap: '20px' }}>
      <EmptyDataImg src={emptyDataImg} alt="텅빈 데이터" />
      <Message>{children}</Message>
      <GoHomeLink to={ROUTE_PATH.ROOT}>홈으로 가기</GoHomeLink>
    </Background>
  );
};

export default EmptyDataCard;

const Background = styled(Box)`
  background-color: var(--color-grayscale-100);
  padding: 20px 0;
`;

const EmptyDataImg = styled.img`
  width: 150px;
  height: 150px;
`;

const Message = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const GoHomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border-radius: 4px;
  background-color: var(--color-primary-tone-down);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-pure-white);
  cursor: pointer;

  :hover {
    filter: brightness(1.1);
  }
`;
