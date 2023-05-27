import { styled } from 'styled-components';

export const CartContainer = styled.div`
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const CartHeader = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 8px 0;

  @media screen and (min-width: 501px) {
    width: 735px;
  }

  @media screen and (max-width: 500px) {
    width: 100%;

    font-size: 13px;

    & > span {
      display: none;
    }
  }
`;

export const NoExistItemsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 200px;

  color: var(--grey-300);

  & > p {
    font-size: 20px;
    margin-bottom: 30px;

    line-height: 25px;
  }

  & > a {
    color: var(--grey-400);
    border-bottom: 3px solid var(--grey-400);
  }
`;
