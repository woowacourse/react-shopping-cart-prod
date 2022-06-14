import { useEffect, useState } from 'react';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/Loading';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUser from '../hooks/useUser';
import useFetch from '../hooks/useFetch';
import useUserForm from '../hooks/useUserForm';

import { SERVER_PATH, USER, USER_INFO_KEY } from '../constants';

function ModifyUserInfoPage() {
  const [userInfo, setUserInfo] = useState({});
  const { data } = useFetch(SERVER_PATH.ME);
  const { userModifyUserInfo } = useUser();
  const handleUserInfoChange = useUserForm(setUserInfo);

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    userModifyUserInfo(userInfo);
  };

  useEffect(() => {
    setUserInfo(data);
  }, [data]);

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
