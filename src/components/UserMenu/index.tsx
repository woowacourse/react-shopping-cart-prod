import { doLogout } from 'actions/actionCreator';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from 'store/store';
import { deleteCookie, getCookie } from 'utils/cookie';
import Styled from './index.style';

const UserMenu = ({ nickname }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const logout = async () => {
    const accessToken = getCookie('accessToken');

    await axios.post(
      '/auth/logout',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    deleteCookie('accessToken');
    setIsOpen(false);
    store.dispatch(doLogout());
    navigate('/');
  };

  return (
    <Styled.Container>
      <Styled.NicknameThumbail onClick={toggleMenu}>{nickname[0]}</Styled.NicknameThumbail>
      {isOpen && (
        <Styled.Menu>
          <Styled.Nickname>{nickname}님 👋</Styled.Nickname>
          <Styled.Line />
          <Styled.MenuItem
            onClick={() => {
              navigate('/account');
              setIsOpen(false);
            }}
          >
            회원수정
          </Styled.MenuItem>
          <Styled.Line />
          <Styled.MenuItem onClick={logout}>로그아웃</Styled.MenuItem>
        </Styled.Menu>
      )}
    </Styled.Container>
  );
};

export default UserMenu;
