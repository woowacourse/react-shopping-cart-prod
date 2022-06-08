import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Box = styled.div`
  width: 100px;
  padding: 10px;

  border-radius: 10px;

  font-size: 0.9rem;
  cursor: pointer;

  opacity: 0.7;
  transition: opacity 0.2s ease-in;
  text-align: center;

  ${({ theme }) => css`
    background-color: ${theme.brandColor_1};
    color: ${theme.whiteColor_1};
  `}

  &:hover {
    opacity: 0.99;
  }
`;

export const OptionWrapper = styled.div`
  display: flex;

  padding: 50px;

  gap: 20px;
`;

export const Option = styled.div`
  border-radius: 4px;

  /* background-color: ${({ backgroundColor }: { backgroundColor: string }) => backgroundColor}; */
  background-color: ${({ theme }) => theme.brandColor_1};
  color: white;

  padding: 10px;

  cursor: pointer;

  transition: transform 0.2s ease-in;

  &:hover {
    transform: rotate(10deg);
  }
`;
