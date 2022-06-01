import styled, { css } from 'styled-components';
import { ReactComponent as ShoppingCart } from 'assets/shopping_cart_icon.svg';

const Styled = {
  CartIcon: styled(ShoppingCart)`
    ${({ category, theme }) => {
      switch (category) {
        case 'header':
          return css`
            path {
              fill: ${theme.colors.white};
            }
            height: 30px;
          `;

        default:
          return css`
            path {
              fill: ${theme.colors.black};
            }
            height: 20px;
          `;
      }
    }}
  `,
};

export default Styled;
