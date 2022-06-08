import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/Loading';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUserForm from '../hooks/useUserForm';
import { validUserInfo } from '../utils/validations';

import { MESSAGE, ROUTES_PATH, SERVER_PATH, STORAGE_KEY, USER, USER_INFO_KEY } from '../constants';

function ModifyUserInfoPage() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, handleUserInfoChange } = useUserForm();
  const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    const { nickname } = userInfo;

    try {
      validUserInfo(nickname);
      await axios.patch(SERVER_PATH.USER, { nickname });
      alert(MESSAGE.MODIFY_NICKNAME_SUCCESS);
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get(SERVER_PATH.ME, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('userInfo', data);
        setUserInfo(data);
      } catch (error) {
        alert(error);
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
          onChange={handleUserInfoChange(setUserInfo, USER_INFO_KEY.NICKNAME)}
        />
        <Button>수정하기</Button>
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default ModifyUserInfoPage;
