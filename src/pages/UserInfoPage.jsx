import { Link } from 'react-router-dom';

import useUser from '../hooks/useUser';
import Button from '../components/common/Button';
import { StyledUserContainer } from '../components/common/Styled';

import { MESSAGE, ROUTES_PATH } from '../constants';

function UserInfoPage() {
  const { withdrawMembership, removeToken } = useUser();

  const onClickWithdrawButton = () => {
    if (window.confirm(MESSAGE.CHECK_WITHDRAW)) {
      withdrawMembership();
    }
  };

  return (
    <StyledUserContainer>
      <h1>회원 정보 수정</h1>
      <Link to={ROUTES_PATH.MODIFY_PASSWORD}>
        <Button>비밀번호 수정</Button>
      </Link>
      <Link to={ROUTES_PATH.MODIFY_USER_INFO}>
        <Button>회원 정보 수정</Button>
      </Link>
      <Button onClick={() => removeToken(MESSAGE.LOGOUT_SUCCESS)}>로그아웃</Button>
      <Button onClick={onClickWithdrawButton}>회원 탈퇴</Button>
    </StyledUserContainer>
  );
}

export default UserInfoPage;
