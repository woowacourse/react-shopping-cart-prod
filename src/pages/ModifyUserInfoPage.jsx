import { useEffect } from 'react';
import axios from 'axios';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/Loading';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUser from '../hooks/useUser';
import useUserForm from '../hooks/useUserForm';
import { validUserInfo } from '../utils/validations';

import { SERVER_PATH, STORAGE_KEY, USER, USER_INFO_KEY } from '../constants';

function ModifyUserInfoPage() {
  const { modifyUserInfo } = useUser();
  const { state: userInfo, setState: setUserInfo, handleUserInfoChange } = useUserForm({});
  const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();

    const { nickname } = userInfo;
    try {
      validUserInfo(nickname);
      modifyUserInfo(nickname);
    } catch (error) {
      alert(error.message);
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
        setUserInfo(data);
      } catch (error) {
        alert(error.response.data.message);
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
