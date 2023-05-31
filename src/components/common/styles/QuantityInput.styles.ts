import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  width: 140px;
  height: 36px;

  text-align: center;
  font-size: 16px;

  & > button:first-of-type {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    border-top: 1px solid #aaaaaa;
    border-bottom: 1px solid #aaaaaa;
    border-left: 1px solid #aaaaaa;
  }

  & > button:last-of-type {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    border-top: 1px solid #aaaaaa;
    border-bottom: 1px solid #aaaaaa;
    border-right: 1px solid #aaaaaa;
  }
`;

export const Input = styled.input`
  width: 60px;
  height: 100%;

  text-align: center;
  font-size: inherit;
  color: #333333;

  border-top: 1px solid #aaaaaa;
  border-bottom: 1px solid #aaaaaa;
`;

export const Counter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 36px;
  background: #fff;

  &:disabled {
    cursor: default;
  }
`;
