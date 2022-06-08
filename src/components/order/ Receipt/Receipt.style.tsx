import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;

  ${({ theme }) => theme.tablet} {
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  -webkit-box-shadow: 1px 1.5px 3px 0px rgba(20, 24, 82, 0.27);
  box-shadow: 2px 3px 6px 0px rgba(20, 24, 82, 0.27);

  min-width: ${({ theme }) => theme.minWidth};

  padding: 20px;

  border-radius: 4px;

  ${({ theme }) => css`
    background-color: ${theme.brandColor_1};
    color: ${theme.whiteColor_1};
  `};

  ${({ theme }) => theme.tablet} {
    min-width: 90%;
  }
`;

export const Title = styled.h1`
  padding: 10px 0;

  border-bottom: 1px solid ${({ theme }) => theme.greyColor_1};

  font-size: 1.2rem;
`;

export const Information = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 0;
`;
