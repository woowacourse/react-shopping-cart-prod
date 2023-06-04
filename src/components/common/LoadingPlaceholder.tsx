import { styled } from 'styled-components';
import Spinner from './Spinner';

const LoadingPlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;

  padding: 96px 0;
  font-size: 36px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

type LoadingPlaceholderProps = {
  title?: string;
};

const LoadingPlaceholder = (props: LoadingPlaceholderProps) => {
  const { title } = props;

  return (
    <LoadingPlaceholderContainer>
      {title && <Title>{title}</Title>}
      <Spinner />
    </LoadingPlaceholderContainer>
  );
};

export default LoadingPlaceholder;
