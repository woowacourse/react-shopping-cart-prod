import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import HomeIcon from '../assets/icons/home-icon.svg';
import servers from '../config/servers';
import cartItemsState from '../recoil/atoms/cartItemsState';
import serverState from '../recoil/atoms/serverState';
import Badge from './common/Badge';
import AwaitRecoilState from './utils/AwaitRecoilState';

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;

  background: #333;
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
  font-size: 40px;
  font-weight: 900;
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
  background-color: #333;
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
          <img alt="홈" src={HomeIcon} width={44} />
          <HomeButtonText>SHOP</HomeButtonText>
        </HomeButton>

        <Menu>
          <Selector onChange={handleServerChange} value={server.name}>
            {servers.map((server) => (
              <Option key={server.name} value={server.name}>
                {server.name}
              </Option>
            ))}
          </Selector>

          <MenuButton onClick={() => onNavigate('/cart')}>
            장바구니{' '}
            <AwaitRecoilState state={cartItemsState}>
              {(cartItems) => <Badge show={cartItems.length > 0}>{cartItems.length}</Badge>}
            </AwaitRecoilState>
          </MenuButton>
        </Menu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
