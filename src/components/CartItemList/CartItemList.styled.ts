import { styled } from 'styled-components';

export const CartItem = styled.li`
  display: flex;
  justify-content: space-between;

  color: var(--grey-400);

  &:first-child {
    border-top: 4px solid var(--grey-300);
  }

  &:not(:last-child) {
    border-bottom: 1.5px solid var(--grey-400);
  }

  @media screen and (min-width: 501px) {
    width: 735px;
    padding: 33px 0;
  }

  @media screen and (max-width: 500px) {
    padding: 20px 0;
  }
`;

export const LeftInfo = styled.div`
  display: flex;
`;

export const ProductImage = styled.div<{ path: string }>`
  width: 144px;
  height: 147px;

  margin: 0 20px 0 15px;

  background-image: ${(props) => `url(${props.path})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media screen and (max-width: 500px) {
    width: 96px;
    height: 98px;

    margin: 0 6px;
  }
`;

export const ProductName = styled.div`
  font-size: 20px;

  font-weight: 400;
  padding-top: 5px;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

export const RightInfo = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: flex-end;
`;

export const ProductPrice = styled.div`
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;
