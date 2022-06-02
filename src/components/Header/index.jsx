import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Wrapper from './style';

import { PATH } from 'constants';

const Header = () => {
  const { accessToken } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <Link to={PATH.HOME}>
        <div className="home flex-row">
          <img src="/img/shopping-cart-white.png" alt="home-button" />
          <button>WOOWA SHOP</button>
        </div>
      </Link>
      <div className="nav flex-row">
        <Link to={PATH.CARTS}>
          <button>장바구니</button>
        </Link>
        <button>주문목록</button>
        {accessToken && (
          <>
            <Link to={PATH.PROFILE}>
              <button>프로필</button>
            </Link>
          </>
        )}
        {accessToken || (
          <>
            <Link to={PATH.LOGIN}>
              <button>로그인</button>
            </Link>
            <Link to={PATH.SIGNUP}>
              <button>회원가입</button>
            </Link>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Header;
