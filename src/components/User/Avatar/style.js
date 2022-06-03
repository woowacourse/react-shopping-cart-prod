import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLOR.PINK_300};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.COLOR.PINK_200};
  }
`;

export const Thumbnail = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLOR.WHITE};
`;
