import styled, { keyframes } from 'styled-components';

const SmallLoader = () => {
  return <Style.LoaderWrapper />;
};

const Rotate = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Style = {
  LoaderWrapper: styled.div`
    border: 10px solid #f3f3f3;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${Rotate} 1s linear infinite;
  `,
};

export default SmallLoader;
