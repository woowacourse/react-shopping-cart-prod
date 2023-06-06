import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ShoppingCartIcon } from '../../assets/icon/tiffany-co.svg';
import { WIDTH } from '../../constants/mediaQuery';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { ServerName, serverAtom } from '../../store/server';
import CartTextButton from './CartTextButton/CartTextButton';
import { PATH } from '../../constants/path';
import { cartAtom } from '../../store/cart';
import { loginState } from '../../store/loginState';

const Header = () => {
  const isSignedIn = useRecoilValue(loginState);
  const [serverName, setServerName] = useRecoilState(serverAtom);
  const resetCartList = useResetRecoilState(cartAtom);

  const onChangeServerNameHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const serverName = e.target.value as ServerName;
    setServerName(() => serverName);
    resetCartList();
  };

  return (
    <Container>
      <Link to={PATH.PRODUCT_PAGE}>
        <HomeButton>
          <ShoppingCartIconContainer>
            <ShoppingCartIcon width='100%' />
          </ShoppingCartIconContainer>
        </HomeButton>
      </Link>
      <ButtonContainer>
        <ServerSelectBox
          value={serverName}
          onChange={onChangeServerNameHandler}>
          <option value='SPLIT'>스플릿</option>
          <option value='ROY'>로이</option>
          <option value='IRAE'>이레</option>
          <option value='ERROR'>에러</option>
        </ServerSelectBox>
        {isSignedIn ? (
          <>
            <Link to={PATH.ORDER_LIST_PAGE}>
              <Button>Orders</Button>
            </Link>
            <Link to={PATH.CART_PAGE}>
              <CartTextButton />
            </Link>
          </>
        ) : (
          <Link to={PATH.SIGN_IN}>
            <Button>login</Button>
          </Link>
        )}
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 75px;

  margin: 0;
  padding: 18px 15%;

  background: var(--main-bg-color);

  min-width: ${WIDTH.SM};

  @media (max-width: ${WIDTH.LG}) {
    padding: 8px 16px;
  }

  @media (max-width: ${WIDTH.MD}) {
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
  display: flex;
  align-items: center;

  width: 70px;
  height: 30px;
  padding-left: 2px;

  border: none;

  color: #fff;
  font-size: 16px;

  background-color: transparent;

  @media (max-width: ${WIDTH.MD}) {
    font-size: 12px;
    width: 50px;
  }
`;

const ShoppingCartIconContainer = styled.div`
  padding-top: 10px;
  width: 200px;
  fill: #fff;
  padding-bottom: 10px;

  @media (max-width: ${WIDTH.MD}) {
    width: 160px;
  }
`;

const Button = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: 300;

  cursor: pointer;

  @media (max-width: ${WIDTH.MD}) {
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${WIDTH.MD}) {
    gap: 16px;
  }
`;

export default Header;
