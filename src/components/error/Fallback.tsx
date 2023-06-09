import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorMessage } from '../../constants/errorMessage';

interface FallbackProps {
  error: Error;
}

const isPredictableError = (
  errorMessage: string
): errorMessage is keyof typeof ErrorMessage => {
  return Object.keys(ErrorMessage).includes(errorMessage);
};

export const Fallback = ({ error }: FallbackProps) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');

    window.location.reload();
  };

  return (
    <Style.Container>
      <Style.Title>앗!</Style.Title>
      <Style.Caption>
        {isPredictableError(error.message)
          ? ErrorMessage[error.message]
          : '예상치 못한 오류가 발생했습니다.'}
      </Style.Caption>
      <Style.HomeButton onClick={goHome}>홈으로</Style.HomeButton>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    padding-top: 50px;
  `,
  Title: styled.h1`
    font-size: 150px;
  `,
  Caption: styled.span`
    font-size: 25px;
  `,
  HomeButton: styled.button`
    width: 200px;
    height: 50px;

    border-radius: 10px;
    background-color: rgb(42, 193, 188);

    font: var(--font-baemin);
    font-size: 23px;
    color: white;
  `,
};
