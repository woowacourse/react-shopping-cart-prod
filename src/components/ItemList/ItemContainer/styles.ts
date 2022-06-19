import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

export const Styled = {
  ItemContainer: styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 28.2rem;
    height: 35.8rem;
    gap: 1.8rem;
    cursor: pointer;
    transition: box-shadow 0.1s ease;
    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      img {
        transform: scale(1.2);
      }
    }
    img {
      transition: transform 0.5s ease;
    }
  `,

  Footer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    align-items: center;
  `,

  Title: styled.p`
    font-size: 1.6rem;
  `,

  Price: styled.p`
    font-size: 2rem;
  `,

  CartIcon: styled(CartIcon)`
    cursor: pointer;
  `,
};
