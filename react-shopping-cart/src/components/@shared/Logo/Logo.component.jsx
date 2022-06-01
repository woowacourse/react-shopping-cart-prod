import FlexBox from '../FlexBox/FlexBox.component';
import TextBox from '../TextBox/TextBox.component';
import styled from 'styled-components';

import theme from 'styles/theme';

import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

const LogoBox = styled(FlexBox).attrs({
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: '10px',
})`
  margin: 15px 0;
`;

function Logo({ color }) {
  return (
    <LogoBox>
      <ShoppingCart fill={theme.colors[color]} width={40} height={35} />
      <TextBox bold color={color} fontSize="large">
        WOOWA SHOP
      </TextBox>
    </LogoBox>
  );
}

export default Logo;
