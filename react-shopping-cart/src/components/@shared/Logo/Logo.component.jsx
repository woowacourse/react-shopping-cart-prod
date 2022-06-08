import FlexBox from '../FlexBox/FlexBox.component';
import TextBox from '../TextBox/TextBox.component';

import theme from 'styles/theme';

import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

function Logo({ color, width = 40, height = 35, fontSize = 'large' }) {
  return (
    <FlexBox alignItems="flex-end" justifyContent="center" gap="10px">
      <ShoppingCart fill={theme.colors[color]} width={width} height={height} />
      <TextBox bold color={color} fontSize={fontSize}>
        WOOWA SHOP
      </TextBox>
    </FlexBox>
  );
}

export default Logo;
