import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { serverAtom } from '../../store/server';
import { PATH } from '../../store/path';

const ErrorComponent = () => {
  const setServerName = useSetRecoilState(serverAtom);
  const navigate = useNavigate();

  const onClickGoHome = () => {
    setServerName('SPLIT');
    navigate(PATH.PRODUCT_PAGE);
  };
  return (
    <ErrorContainer>
      <ErrorTitle>404 Not Found</ErrorTitle>
      <ErrorMessage>페이지를 찾을 수 없습니다.</ErrorMessage>
      <GoHomeButton onClick={onClickGoHome}>홈으로 돌아가기</GoHomeButton>
    </ErrorContainer>
  );
};

export default ErrorComponent;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;

  height: 80vh;
`;

const ErrorTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
`;

const ErrorMessage = styled.div`
  font-size: 24px;
`;

const GoHomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--grey-100);

  height: 73px;
  width: 400px;

  font-size: 24px;
  font-weight: 200;

  transition: background-color 0.5s ease;

  &:hover {
    color: #fff;
    background-color: var(--main-bg-color);
  }
`;
