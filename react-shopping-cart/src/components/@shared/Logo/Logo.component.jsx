import FlexBox from '../FlexBox/FlexBox.component';
import TextBox from '../TextBox/TextBox.component';

import theme from 'styles/theme';

import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

function Logo({ color }) {
  return (
    <FlexBox alignItems="flex-end" justifyContent="center" gap="10px">
      <ShoppingCart fill={theme.colors[color]} width={40} height={35} />
      <TextBox bold color={color} fontSize="large">
        WOOWA SHOP
      </TextBox>
    </FlexBox>
  );
}

export default Logo;
