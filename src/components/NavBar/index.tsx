import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import routes from '../../routes';
import { NavBarContainer, NavBarTitle, NavBarMenu } from './styles';

function NavBar() {
  return (
    <NavBarContainer>
      <NavBarTitle to={routes.home}>
        <img alt="Logo" src={Logo} />
        <h1>WOOWA SHOP</h1>
      </NavBarTitle>
      <NavBarMenu>
        <Link to={routes.cart}>장바구니</Link>
        <Link to={routes.orderList}>주문목록</Link>
      </NavBarMenu>
    </NavBarContainer>
  );
}

export default NavBar;
