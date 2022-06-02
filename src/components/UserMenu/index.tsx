import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './index.style';

const UserMenu = ({ nickname }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const navigate = useNavigate();

  return (
    <Styled.Container>
      <Styled.NicknameThumbail onClick={toggleMenu}>{nickname[0]}</Styled.NicknameThumbail>
      {isOpen && (
        <Styled.Menu>
          <Styled.Nickname>{nickname}님 👋</Styled.Nickname>
          <Styled.Line />
          <Styled.MenuItem onClick={() => navigate('/account')}>회원수정</Styled.MenuItem>
          <Styled.Line />
          <Styled.MenuItem onClick={() => {}}>로그아웃</Styled.MenuItem>
        </Styled.Menu>
      )}
    </Styled.Container>
  );
};

export default UserMenu;
