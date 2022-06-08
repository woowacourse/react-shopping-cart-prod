import styled, { css } from 'styled-components';

export const Container = styled.div`
  -webkit-box-shadow: 1px 1.5px 3px 0px rgba(20, 24, 82, 0.27);
  box-shadow: 2px 3px 6px 0px rgba(20, 24, 82, 0.27);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 15px 10px;

  ${({ isClickable }: { isClickable: boolean }) => css`
    cursor: ${isClickable ? 'pointer' : 'default'};
  `}

  ${({ theme }) => css`
    background-color: rgba(20, 24, 82, 0.85);
    color: ${theme.whiteColor_1};
  `}
`;

export const OrderCartContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 10px 0;
  gap: 20px;

  border-bottom: 1px solid ${({ theme }) => theme.greyColor_1};
`;

export const OrderCartImageWrapper = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderCartNameWrapper = styled.div`
  min-width: 50px;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;

  & > h1 {
    font-size: 1.5rem;
  }

  & > span {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.6);
  }
`;
