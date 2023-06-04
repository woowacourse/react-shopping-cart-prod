import { useNavigate } from 'react-router-dom';
import ContentLayout from '../ContentLayout';
import Header from '../Header';
import * as S from './ErrorComponent.styles';

const ErrorComponent = () => {
  const navigate = useNavigate();

  const onReload = () => {
    navigate(0);
  };

  return (
    <ContentLayout>
      <S.Wrapper>
        <Header />
        <img src={process.env.PUBLIC_URL + '/error.png'} />
        <S.ErrorMessage>잘못된 요청입니다.</S.ErrorMessage>
        <S.ReloadButton onClick={onReload}>다시 시도하기</S.ReloadButton>
      </S.Wrapper>
    </ContentLayout>
  );
};
export default ErrorComponent;
