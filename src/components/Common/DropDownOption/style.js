import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 70px;
  font-size: 16px;
  border-bottom: ${({ hasUnderLine = true, theme }) =>
    hasUnderLine ? `2px solid ${theme.COLOR.GREY_200}` : ''};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.COLOR.GREY_200};
  }
`;
