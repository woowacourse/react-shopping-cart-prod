import styled from "styled-components";

export const InputContainer = styled.div`
  height: 80px;
`;

export const Input = styled.input`
  width: ${({ width }) => width};
  padding: 16px;

  border: none;
  border-radius: 8px;

  ${({ theme: { fontSize, color } }) => `
    font-size: ${fontSize.medium};
    outline: 1px solid ${color.gray02};

    &:focus {
      outline: 1px solid ${color.gray01};
    }

    &::placeholder {
      color: ${color.gray02};
    }

    &:disabled {
      outline: 1px solid ${color.gray02};
    }
  `}
`;

export const ErrorMessage = styled.p`
  height: 32px;
  padding: 8px;
  color: ${({ theme: { color } }) => color.point};
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
`;
