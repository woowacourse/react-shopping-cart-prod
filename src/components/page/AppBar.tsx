/* eslint-disable no-nested-ternary */
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { styled } from 'styled-components';
import HomeIcon from '../../assets/icons/home-icon.svg';
import servers from '../../config/servers';
import serverState from '../../recoil/atoms/serverState';
import userCartItemsState from '../../recoil/user/userCartItemsState';
import userProfileState from '../../recoil/user/userProfileState';
import Badge from '../common/Badge';
import Spinner from '../common/Spinner';

const AppBarContainer = styled.header`
  width: 100%;
  height: 80px;

  background: #333;
  color: white;
`;

const AppBarContent = styled.div`
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
  align-items: center;
  gap: 24px;

  padding: 4px 24px;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  align-self: stretch;
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

const MenuProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MenuProfileUsername = styled.div`
  font-size: 16px;
`;

const MenuProfilePoints = styled.div`
  font-size: 12px;

  &::after {
    content: 'P';
    margin-left: 4px;
  }
`;

type HeaderProps = {
  onNavigate: (to: string) => void;
};

const AppBar = (props: HeaderProps) => {
  const { onNavigate } = props;
  const cartItemsLoadable = useRecoilValueLoadable(userCartItemsState);
  const profileLoadable = useRecoilValueLoadable(userProfileState);
  const [server, setServer] = useRecoilState(serverState);

  const handleServerChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const serverName = event.target.value;
    const server = servers.find((server) => server.name === serverName)!;

    setServer(server);
  };

  return (
    <AppBarContainer>
      <AppBarContent>
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

          <MenuButton onClick={() => onNavigate('/orders')}>주문목록</MenuButton>

          <MenuButton onClick={() => onNavigate('/cart')}>
            장바구니{' '}
            {cartItemsLoadable.state === 'hasValue' && (
              <Badge show={cartItemsLoadable.getValue().length > 0}>
                {cartItemsLoadable.getValue().length}
              </Badge>
            )}
          </MenuButton>

          {profileLoadable.state === 'loading' ? (
            <Spinner color="currentColor" />
          ) : profileLoadable.state === 'hasValue' ? (
            <MenuProfile>
              <MenuProfileUsername>{profileLoadable.getValue().username}</MenuProfileUsername>
              <MenuProfilePoints>{profileLoadable.getValue().currentPoints}</MenuProfilePoints>
            </MenuProfile>
          ) : (
            <MenuButton onClick={() => onNavigate('/login')}>로그인</MenuButton>
          )}
        </Menu>
      </AppBarContent>
    </AppBarContainer>
  );
};

export default AppBar;
