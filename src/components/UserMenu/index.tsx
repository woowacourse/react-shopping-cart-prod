import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useSnackbar from 'hooks/useSnackbar';

import { deleteCookie } from 'utils/cookie';
import Styled from './index.style';
import { MESSAGE } from 'utils/constants';
import apiClient from 'apis/apiClient';
import { doLogout } from 'reducers/auth.reducer';
import { doInitializeCartList } from 'reducers/cart.reducer';

const UserMenu = ({ nickname }) => {
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');

      setIsOpen(false);
      dispatch(doLogout());
      dispatch(doInitializeCartList({ shoppingCart: [] }));
      renderSnackbar(MESSAGE.LOGOUT_SUCCESS, 'SUCCESS');
      deleteCookie('accessToken');
      navigate('/');
    } catch (error) {
      console.log(error);
      renderSnackbar(MESSAGE.LOGIN_FAILURE, 'FAILED');
    }
  };

  return (
    <Styled.Container>
      <Styled.NicknameThumbnail onClick={toggleMenu}>{nickname[0]}</Styled.NicknameThumbnail>
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
