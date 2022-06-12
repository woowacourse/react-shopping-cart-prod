import styled from 'styled-components';

const InputContainer = styled.div`
  label {
    margin-bottom: 4px;
    line-height: 24px;
    letter-spacing: 0.5px;
  }

  input {
    font-size: 18px;
    width: 100%;
    height: 40px;
    padding: 10px;
    margin-bottom: 15px;
    border: 2px solid ${({ theme }) => theme.colors.GRAY_400};
    border-radius: 15px;
  }
`;

const Message = styled.p<{ isValid?: boolean }>`
  font-size: 14px;
  margin-bottom: 20px;
  color: ${({ isValid }) => (isValid ? 'green' : 'red')};
`;

export { InputContainer, Message };
