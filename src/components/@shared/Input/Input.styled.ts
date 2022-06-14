import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  border-radius: 2px;

  padding: 6px 8px;

  &[type='number'] {
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;

      margin: 0;
    }
  }
`;

const Label = styled.label`
  margin-top: 4px;

  font-size: 14px;
`;

export { Input, Label };
