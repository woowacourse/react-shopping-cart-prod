import styled from 'styled-components';
import theme from 'styles/theme';

const Loading = () => {
  return (
    <StyledLoader>
      <Spinner>
        <Debounce1 />
        <Debounce2 />
      </Spinner>
    </StyledLoader>
  );
};

export default Loading;

const StyledLoader = styled.div`
  z-index: 1;
  position: absolute;
  top: 48%;
  left: 28%;

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const Spinner = styled.div`
  width: 14rem;
  height: 14rem;

  position: relative;
  margin: 10rem auto;
`;

const Debounce1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${theme.colors.darkGrey};
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
`;

const Debounce2 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${theme.colors.darkGrey};
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;

  -webkit-animation-delay: -1s;
  animation-delay: -1s;
`;
