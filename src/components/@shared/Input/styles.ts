import styled from 'styled-components';

const InputContainer = styled.div`
  label {
    margin-bottom: 4px;
    line-height: 24px;
    letter-spacing: 0.5px;
  }

  input {
    width: 100%;
    height: 36px;
    padding: 0;
    margin-bottom: 16px;
  }
`;

const Message = styled.p<{ isValid?: boolean }>`
  font-size: 10px;
  color: ${({ isValid }) => (isValid ? 'green' : 'red')};
`;

export { InputContainer, Message };
