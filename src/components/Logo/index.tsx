import Styled from './index.style';
import { ROUTES } from 'utils/constants';
import CartIcon from 'components/CartIcon';

const Logo = () => {
  return (
    <Styled.HomeLink to={ROUTES.HOME}>
      <CartIcon category="header" /> WOOWA SHOP
    </Styled.HomeLink>
  );
};

export default Logo;
