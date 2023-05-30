import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ShoppingCartIcon } from '../../assets/icon/stussy-logo.svg';
import { WIDTH } from '../../styles/mediaQuery';
import { useRecoilState } from 'recoil';
import { ServerName, serverAtom } from '../../store/server';
import CartTextButton from '../CartTextButton/CartTextButton';
import { PATH } from '../../store/path';

const Header = () => {
  const [serverName, setServerName] = useRecoilState(serverAtom);

  const onChangeServerNameHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const serverName = e.target.value as ServerName;
    setServerName(serverName);
  };

  return (
    <Container>
      <Link to='/'>
        <HomeButton>
          <ShoppingCartIconContainer>
            <ShoppingCartIcon width='100%' />
          </ShoppingCartIconContainer>
        </HomeButton>
      </Link>
      <ButtonContainer>
        <ServerSelectBox
          defaultValue={serverName}
          onChange={onChangeServerNameHandler}>
          <option value='SPLIT'>스플릿</option>
          <option value='ROY'>로이</option>
          <option value='IRAE'>이레</option>
        </ServerSelectBox>
        <Link to={PATH.CART_PAGE}>
          <CartTextButton />
        </Link>
        <Link to={PATH.ORDER_LIST_PAGE}>
          <OrderListButton>주문 목록</OrderListButton>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;

  margin: 0;
  padding: 18px 15%;

  background: #333333;

  min-width: ${WIDTH.SM};

  @media (max-width: ${WIDTH.MD}) {
    padding: 8px 12%;

    h1 {
      font-size: 20px;
    }

    h2 {
      font-size: 16px;
    }
  }
`;

const HomeButton = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  background-color: transparent;

  cursor: pointer;

  @media (max-width: ${WIDTH.MD}) {
    gap: 4px;
  }
`;

const ServerSelectBox = styled.select`
  width: 80px;
  height: 40px;

  border: none;
  border-radius: 10px;

  padding-left: 8px;
`;

const ShoppingCartIconContainer = styled.div`
  padding-top: 10px;
  width: 60px;
  fill: #fff;

  @media (max-width: ${WIDTH.MD}) {
    width: 45px;
  }
`;

const OrderListButton = styled.div`
  color: white;
  font-size: 18px;

  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export default Header;
