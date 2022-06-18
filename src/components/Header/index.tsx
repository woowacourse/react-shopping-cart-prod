import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState } from 'react';
import { signOut } from 'redux/actions/user';
import { clearCartList } from 'redux/actions/cartList';
import { useDispatch } from 'react-redux';
import { Styled } from './styles';
import { isEmptyObject } from 'utils';

const Header = () => {
  const navigate = useNavigate();
  const { data } = useAppSelector(state => state.userReducer);
  const [isShowHamburger, setIsShowHamburger] = useState(false);
  const dispatch = useDispatch();

  const toggleHamburger = () => {
    setIsShowHamburger(!isShowHamburger);
  };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(signOut());
    dispatch(clearCartList());
  };

  return (
    <Styled.Header>
      <div>
        <Link to='/main/1'>
          <div>
            <CartIcon fill='white' />
            <Styled.BrandName>RoyStin Shop</Styled.BrandName>
          </div>
        </Link>
        <Styled.Nav>
          <button onClick={() => navigate('/cart')}>장바구니</button>
          <button>주문목록</button>
          {isEmptyObject(data) ? (
            <button onClick={() => navigate('/signIn')}>로그인</button>
          ) : (
            <button onClick={toggleHamburger}>
              마이페이지
              <Styled.HamburgerList isShow={isShowHamburger}>
                <Link to='/editPassword'>비밀번호 변경</Link>
                <Link to='/resign'>회원 탈퇴</Link>
                <Link onClick={handleSignOut} to=''>
                  로그아웃
                </Link>
              </Styled.HamburgerList>
            </button>
          )}
        </Styled.Nav>
      </div>
    </Styled.Header>
  );
};

export default Header;
