import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import useAuth from 'hooks/domain/useAuth';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import Styled from './index.style';

const UserMenu = ({ nickname }) => {
  const navigate = useNavigate();
  const { renderSnackbar } = useSnackbar();
  const { logout: initializeAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const editAccount = () => {
    setIsOpen(false);
    navigate(PATHNAME.TO_ACCOUNT);
  };

  const logout = () => {
    initializeAuth(() => {
      renderSnackbar(MESSAGE.LOGOUT_SUCCESS, SNACKBAR.SUCCESS);
      setIsOpen(false);
      navigate(PATHNAME.TO_HOME);
    });
  };

  return (
    <Styled.Container>
      <Styled.NicknameThumbail onClick={toggleMenu}>{nickname[0]}</Styled.NicknameThumbail>
      {isOpen && (
        <Styled.Menu>
          <Styled.NicknameContainer>
            <Styled.Nickname>{nickname}</Styled.Nickname>님, 안녕하세요 👋
          </Styled.NicknameContainer>

          <Styled.MenuItem onClick={editAccount}>회원수정</Styled.MenuItem>
          <Styled.MenuItem onClick={logout}>로그아웃</Styled.MenuItem>
        </Styled.Menu>
      )}
      {isOpen && <Styled.Dimmer onClick={toggleMenu} />}
    </Styled.Container>
  );
};

export default UserMenu;
