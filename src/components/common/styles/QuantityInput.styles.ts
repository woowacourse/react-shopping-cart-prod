import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  width: 72px;
  height: 36px;

  text-align: center;
  font-size: 16px;
`;

export const Input = styled.input`
  width: 64%;
  height: 100%;
  border: 1px solid #dddddd;

  text-align: center;
  font-size: inherit;
  color: #333333;
`;

export const CounterBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 36%;
  height: 100%;
`;

export const Counter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50%;
  border: 1px solid #dddddd;
  background: transparent;

  & > img {
    width: 48%;
    height: 32%;
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.1);
    cursor: default;
  }

  &:disabled > img {
    visibility: hidden;
  }
`;
