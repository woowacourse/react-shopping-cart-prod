import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import cartIcon from '../assets/images/shopping-cart.png';
import orderIcon from '../assets/images/shopping-bag.png';
import cartItemsState from '../recoil/atoms/cartItemsState';
import serverState from '../recoil/atoms/serverState';
import servers from '../servers';
import Badge from './common/Badge';
import AwaitRecoilState from './utils/AwaitRecoilState';

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;

  background: #000000;
  color: white;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  margin: 0 auto;
  padding: 0 24px;

  height: 100%;
  max-width: 1300px;
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;

  color: inherit;
`;

const HomeButtonText = styled.h1`
  font-size: 30px;
  /* font-weight: 900; */
`;

const Menu = styled.nav`
  display: flex;
  gap: 24px;

  padding: 4px 24px;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 24px;
  font-weight: 500;
`;

const Selector = styled.select`
  background-color: transparent;
`;

const Option = styled.option`
  background-color: #000000;
`;

const CartIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(100%);
`;

const OrderIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(100%);
`;

type HeaderProps = {
  onNavigate: (to: string) => void;
};

const Header = (props: HeaderProps) => {
  const { onNavigate } = props;
  const [server, setServer] = useRecoilState(serverState);

  const handleServerChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const serverName = event.target.value;
    const server = servers.find((server) => server.name === serverName)!;

    setServer(server);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <HomeButton onClick={() => onNavigate('/')}>
          <HomeButtonText>WOOSINSA</HomeButtonText>
        </HomeButton>

        <Menu>
          <Selector onChange={handleServerChange} value={server.name}>
            {servers.map((server) => (
              <Option key={server.name} value={server.name}>
                {server.name}
              </Option>
            ))}
          </Selector>

          <MenuButton>
            <CartIcon src={cartIcon} alt="cart-icon" onClick={() => onNavigate('/cart')} />
            <AwaitRecoilState state={cartItemsState}>
              {(cartItems) => <Badge show={cartItems.length > 0}>{cartItems.length}</Badge>}
            </AwaitRecoilState>
            <OrderIcon src={orderIcon} alt="order-icon" onClick={() => onNavigate('/order-list')} />
          </MenuButton>
        </Menu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
