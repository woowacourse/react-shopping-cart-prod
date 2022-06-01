import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/Loading';

import { MESSAGE, ROUTES_PATH, SERVER_PATH, USER } from '../constants';
import { isValidNickname } from '../utils/validations';

function ModifyUserInfoPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();

    const { nickname } = userInfo;

    if (!isValidNickname(nickname)) {
      alert(MESSAGE.ERROR_NICKNAME);
      return;
    }

    try {
      await axios.patch(SERVER_PATH.USER, { nickname });
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      alert(error);
    }
  };

  const handleUserInfoChange = (userInfoKey) => (e) => {
    setUserInfo((prevState) => {
      return { ...prevState, [userInfoKey]: e.target.value };
    });
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get(SERVER_PATH.ME);
        setUserInfo(data);
      } catch (error) {
        alert(error);
      }
    }
    getUserInfo();
  }, []);

  if (!userInfo) return <Loading />;
  const email = userInfo.email;

  return (
    <StyledModifyUserInfoContainer>
      <h1>회원 정보 수정</h1>
      <StyledUserInfoForm onSubmit={handleUserInfoSubmit}>
        <Input labelText="이메일" type="email" value={email} disabled />
        <Input
          labelText="닉네임"
          type="text"
          minLength={USER.NICKNAME.MIN}
          maxLength={USER.NICKNAME.MAX}
          value={userInfo.nickname}
          placeholder="닉네임을 입력해주세요"
          onChange={handleUserInfoChange('nickname')}
        />
        <Button text="수정하기" />
      </StyledUserInfoForm>
    </StyledModifyUserInfoContainer>
  );
}

const StyledModifyUserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  padding: 44px 80px;
  margin: 0px auto 100px;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledUserInfoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default ModifyUserInfoPage;
