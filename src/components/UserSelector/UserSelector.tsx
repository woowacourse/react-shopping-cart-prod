import { useRef, useState } from 'react';
import * as S from './UserSelector.style';
import UserProfileImage from '../../assets/user.svg';
import useClickOutside from '../../hooks/useClickOutside';

const UserSelector = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const close = () => setMenu(false);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const users = [
    { id: 1, name: '가브리엘', email: 'b@b.com' },
    { id: 2, name: '레오', email: 'c@c.com' },
    { id: 3, name: '비버', email: 'd@d.com' },
    { id: 4, name: '디노', email: 'e@e.com' },
  ];

  useClickOutside<HTMLDivElement>(ref, close);

  return (
    <S.Wrapper ref={ref}>
      <S.UserProfileButton onClick={toggleMenu}>
        <img src={UserProfileImage} alt="user image" />
      </S.UserProfileButton>
      <S.Menu isOpen={menu}>
        <S.UserInfoWrapper>
          <S.UserInfoName>파인</S.UserInfoName>
          <S.UserInfoId>a@a.com</S.UserInfoId>
          <S.UserInfoPoint>보유 포인트: 124p</S.UserInfoPoint>
        </S.UserInfoWrapper>
        <S.UserListWrapper>
          {users.map((user) => {
            return (
              <S.User key={user.id}>
                <S.UserInfoName>{user.name}</S.UserInfoName>
                <S.UserInfoId>{user.email}</S.UserInfoId>
              </S.User>
            );
          })}
        </S.UserListWrapper>
      </S.Menu>
    </S.Wrapper>
  );
};

export default UserSelector;
