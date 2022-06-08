import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/Loading';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUserForm from '../hooks/useUserForm';
import { validUserInfo } from '../utils/validations';

import { MESSAGE, ROUTES_PATH, SERVER_PATH, USER, USER_INFO_KEY } from '../constants';

function ModifyUserInfoPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const accessToken = useSelector(({ user }) => user.accessToken);
  const handleUserInfoChange = useUserForm(setUserInfo);

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    const { nickname } = userInfo;

    try {
      validUserInfo(userInfo);
      await axios.patch(
        SERVER_PATH.USER,
        { nickname },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert(MESSAGE.MODIFY_NICKNAME_SUCCESS);
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get(SERVER_PATH.ME, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserInfo(data);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    }
    getUserInfo();
  }, []);

  if (!userInfo) return <Loading />;

  return (
    <StyledUserContainer>
      <h1>회원 정보 수정</h1>
      <StyledUserForm onSubmit={handleUserInfoSubmit}>
        <Input labelText="이메일" type="email" value={userInfo.email} disabled readonly />
        <Input
          labelText="닉네임"
          type="text"
          minLength={USER.NICKNAME.MIN}
          maxLength={USER.NICKNAME.MAX}
          value={userInfo.nickname}
          placeholder="닉네임을 입력해주세요"
          onChange={handleUserInfoChange(USER_INFO_KEY.NICKNAME)}
        />
        <Button text="수정하기" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default ModifyUserInfoPage;
