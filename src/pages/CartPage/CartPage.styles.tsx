import styled from 'styled-components';
import VIEWPORTS from '../../constants/VIEWPORTS.ts';

export const CartPageContainer = styled.div`
  height: calc(100vh - 80px);
  padding: 25px 0;
  disaply: flex;
  justify-content: center;

  @media screen and (max-width: ${VIEWPORTS.sm}) {
    padding: 30px 0;
  }
`;

export const CartSelectListContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
  padding: 0 79px;

  @media screen and (max-width: ${VIEWPORTS.md}) {
    flex-direction: column;
    padding: 0 24px;
    gap: 0;
  }

  @media screen and (max-width: ${VIEWPORTS.sm}) {
    span {
      font-size: 16px;
    }
  }
`;
