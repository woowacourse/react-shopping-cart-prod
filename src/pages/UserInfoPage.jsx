import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import Button from '../components/common/Button';

import { ROUTES_PATH, SERVER_PATH } from '../constants';
import actionTypes from '../store/user/user.actions';

function UserInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(({ user }) => user.accessToken);

  const handleWithdrawClick = async () => {
    try {
      await axios.delete(`${SERVER_PATH.USER}`, accessToken);
      dispatch({ type: actionTypes.DELETE_TOKEN });
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      alert(error);
    }
  };

  const handleLoginOutClick = () => {
    dispatch({ type: actionTypes.DELETE_TOKEN });
    navigate(ROUTES_PATH.HOME);
  };

  return (
    <StyledUserInfoContainer>
      <h1>회원 정보 수정</h1>
      <Link to={ROUTES_PATH.MODIFY_PASSWORD}>
        <Button text="비밀번호 수정" />
      </Link>
      <Link to={ROUTES_PATH.MODIFY_USER_INFO}>
        <Button text="회원 정보 수정" />
      </Link>
      <Button text="로그아웃" onClick={handleLoginOutClick} />
      <Button text="회원 탈퇴" onClick={handleWithdrawClick} />
    </StyledUserInfoContainer>
  );
}

const StyledUserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  padding: 44px 80px;
  margin: 0px auto 100px;
  border-radius: 4px;
  box-sizing: border-box;
`;

export default UserInfoPage;
