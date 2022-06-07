import styled, { css } from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import ShoppingCartListItem from 'components/ShoppingCartListItem/ShoppingCartListItem.component';

const CartListCountTextBox = styled(TextBox).attrs({
  fontSize: 'medium',
})`
  border-bottom: 1px solid ${({ theme }) => theme.colors['GRAY_001']};
  padding: 20px 0;
  ${({ mb }) =>
    css`
      margin-bottom: ${mb};
    `}
`;

const CartListBox = styled(FlexBox).attrs({
  direction: 'column',
})`
  width: 736px;
`;

function ShoppingCartListContainer({ data }) {
  const carts = data.map(item => ({ quantity: item.quantity, ...item.product }));

  return (
    <CartListBox>
      {Array.isArray(carts) && carts.length === 0 ? (
        <CartListCountTextBox as="h3" mb="50px">
          배송 상품 (0개)
        </CartListCountTextBox>
      ) : (
        <>
          <CartListCountTextBox as="h3">배송 상품 ({carts.length}개)</CartListCountTextBox>
          <ul>
            {carts.map(itemInfo => (
              <li key={itemInfo.id}>
                <ShoppingCartListItem {...itemInfo} />
              </li>
            ))}
          </ul>
        </>
      )}
    </CartListBox>
  );
}

export default ShoppingCartListContainer;
