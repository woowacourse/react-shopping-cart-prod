import styled from 'styled-components';
import errorImg from 'assets/error.png';
import Box from 'components/@common/Box';
import { PropsWithChildren } from 'react';

type LoadingErrorCardProps = {
  onClickRetryButton: () => void;
};

const LoadingErrorCard = ({ children, onClickRetryButton }: PropsWithChildren<LoadingErrorCardProps>) => {
  return (
    <ErrorImgBackground sizing={{ width: '100%' }} flex={{ flexDirection: 'column', gap: '20px' }}>
      <ErrorImg src={errorImg} alt="예상하지 못한 에러 발생" />
      <ErrorMessage>{children}</ErrorMessage>
      <RetryButton onClick={onClickRetryButton}>새로고침</RetryButton>
    </ErrorImgBackground>
  );
};

export default LoadingErrorCard;

const ErrorImgBackground = styled(Box)`
  padding: 30px 0;
  background-color: var(--color-grayscale-100);
`;

const ErrorImg = styled.img`
  width: 150px;
  height: 150px;
`;

const ErrorMessage = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const RetryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 4px;
  background-color: var(--color-primary);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-pure-white);
  cursor: pointer;
`;
