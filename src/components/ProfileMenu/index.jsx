import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { PopupContainer } from 'components/@common';

import { PAGE_LIST } from 'constants/';

import * as S from './styles';

function ProfileMenu() {
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector(({ user }) => user);

  const onClickMenu = (link) => () => {
    navigate(link);
  };

  if (!isLogin) {
    return (
      <Link to={PAGE_LIST.LOGIN}>
        <li className="login">LOGIN</li>
      </Link>
    );
  }

  return (
    <PopupContainer
      width={140}
      target={
        <S.ProfileText>
          <b>{userInfo.nickname}</b>님
        </S.ProfileText>
      }
    >
      <S.ProfileMenu className="profile" onClick={onClickMenu(PAGE_LIST.PROFILE)}>
        회원 정보 수정
      </S.ProfileMenu>
      <S.ProfileMenu className="logout" onClick={onClickMenu(PAGE_LIST.LOGOUT)}>
        로그아웃
      </S.ProfileMenu>
    </PopupContainer>
  );
}

export default ProfileMenu;
