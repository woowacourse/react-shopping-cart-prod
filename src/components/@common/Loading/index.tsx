import { Styled } from './styles';

const Loading = () => {
  return (
    <Styled.Loader>
      <Styled.Spinner>
        <Styled.Debounce1 />
        <Styled.Debounce2 />
      </Styled.Spinner>
    </Styled.Loader>
  );
};

export default Loading;
