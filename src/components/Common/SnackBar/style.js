import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 300px;
  min-height: 60px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 14px -3px ${({ theme }) => theme.COLOR.BLACK};
  color: ${({ theme }) => theme.COLOR.WHITE};
  background-color: ${({ theme, snackBarType }) =>
    snackBarType === 'ERROR'
      ? `${theme.COLOR.PRIMARY_RED}`
      : `${theme.COLOR.PRIMARY_GREEN}`};
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1001;
`;

export const Text = styled.span`
  display: table-cell;
  text-align: left;
  vertical-align: middle;
`;
