import { Link } from 'react-router-dom';

import Button from '../components/common/Button';
import { StyledUserContainer } from '../components/common/Styled';

import useUser from '../hooks/useUser';

import { ROUTES_PATH } from '../constants';

function UserInfoPage() {
  const { userWithdraw, userLogOut } = useUser();

  return (
    <StyledUserContainer>
      <h1>회원 정보 수정</h1>
      <Link to={ROUTES_PATH.MODIFY_PASSWORD}>
        <Button text="비밀번호 수정" />
      </Link>
      <Link to={ROUTES_PATH.MODIFY_USER_INFO}>
        <Button text="회원 정보 수정" />
      </Link>
      <Button text="로그아웃" onClick={userLogOut} />
      <Button text="회원 탈퇴" onClick={userWithdraw} />
    </StyledUserContainer>
  );
}

export default UserInfoPage;
