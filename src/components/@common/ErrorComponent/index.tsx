import ContentLayout from '../ContentLayout';
import { FallbackProps } from '../ErrorBoundary';
import Header from '../Header';
import * as S from './ErrorComponent.styles';

const ErrorComponent = ({ message, resetError }: FallbackProps) => {
  return (
    <ContentLayout>
      <S.Wrapper>
        <Header />
        <img src={process.env.PUBLIC_URL + '/error.png'} />
        <S.ErrorMessage>{message}</S.ErrorMessage>
        <S.ReloadButton onClick={resetError}>다시 시도하기</S.ReloadButton>
      </S.Wrapper>
    </ContentLayout>
  );
};
export default ErrorComponent;
