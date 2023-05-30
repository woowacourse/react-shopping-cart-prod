import styled, { keyframes } from 'styled-components';

const load3 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background: #f42222;
  background: -moz-linear-gradient(left, #f42222 10%, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(left, #f42222 10%, rgba(255, 255, 255, 0) 42%);
  background: -o-linear-gradient(left, #f42222 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, #f42222 10%, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, #f42222 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: ${load3} 1.4s infinite linear;
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

const Spinner = () => <Loader />;

export default Spinner;
