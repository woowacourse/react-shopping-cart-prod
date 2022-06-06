import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Button from '../components/common/Button';
import { StyledUserContainer } from '../components/common/Styled';

import { MESSAGE, ROUTES_PATH, SERVER_PATH } from '../constants';
import actionTypes from '../store/user/user.actions';

function UserInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(({ user }) => user.accessToken);

  const handleWithdrawClick = async () => {
    try {
      await axios.delete(SERVER_PATH.USER, accessToken);
      dispatch({ type: actionTypes.DELETE_TOKEN });
      alert(MESSAGE.WITHDRAW_SUCCESS);
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      alert(error);
    }
  };

  const handleLogOutClick = () => {
    dispatch({ type: actionTypes.DELETE_TOKEN });
    alert(MESSAGE.LOGOUT_SUCCESS);
    navigate(ROUTES_PATH.HOME);
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
      <Button onClick={handleLogOutClick}>로그아웃</Button>
      <Button onClick={handleWithdrawClick}>회원 탈퇴</Button>
    </StyledUserContainer>
  );
}

export default UserInfoPage;
