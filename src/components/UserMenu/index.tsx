import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';

import { doInitializeCart, doLogout } from 'actions/actionCreator';
import { deleteCookie } from 'utils/cookie';
import Styled from './index.style';

const UserMenu = ({ nickname }) => {
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const logout = () => {
    deleteCookie('accessToken');
    dispatch(doInitializeCart());
    dispatch(doLogout());
    setIsOpen(false);
    renderSnackbar('로그아웃이 완료되었습니다.', 'SUCCESS');
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
