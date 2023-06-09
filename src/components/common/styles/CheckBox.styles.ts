import styled from 'styled-components';

export const Wrapper = styled.div`
  input {
    display: none;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  border: 1.5px solid #22a6a2;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
  }

  input:checked ~ & {
    border-color: #3288ff;
    background: #333333;
  }
`;
