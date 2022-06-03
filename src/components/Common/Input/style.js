import styled from 'styled-components';

export const Wrapper = styled.label`
  max-width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.COLOR.GREY_300};
`;

export const Description = styled.p`
  font-size: 12px;
  margin-left: 4px;
  margin-bottom: 4px;
`;
