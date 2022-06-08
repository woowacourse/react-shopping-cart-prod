import styled, { css } from 'styled-components';
import { ReactComponent as ShoppingCart } from 'assets/shopping_cart_icon.svg';

const Styled = {
  CartIcon: styled(ShoppingCart)`
    display: block;

    ${({ category, theme }) => {
      switch (category) {
        case 'header':
          return css`
            path {
              fill: ${theme.colors.white};
            }
            height: 36px;
            margin-right: 10px;
          `;

        default:
          return css`
            path {
              fill: ${theme.colors.black};
            }
            height: 25px;
          `;
      }
    }}
  `,
};

export default Styled;
