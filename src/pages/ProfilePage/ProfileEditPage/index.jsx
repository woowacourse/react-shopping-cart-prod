import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as membersThunk from 'actions/members/thunk';

import useFormValidation from 'hooks/useFormValidation';

import { Title, Icon } from 'components/@common';

import { ICON_CODE, REQUEST_STATUS } from 'constants/';
import { getFormData } from 'lib/formUtils';
import { userValidator } from 'lib/validateUtils';

import EditProfile from '../Containers/EditProfile';
import * as S from './styles';

const passwordValidation = {
  password: ({ password }) => userValidator.password(password),
  passwordConfirm: ({ password, passwordConfirm }) =>
    userValidator.passwordConfirm(password, passwordConfirm),
};

function ProfileEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { errorList, isAllPassed, validationForm } = useFormValidation(passwordValidation);
  const { userInfoAsyncState } = useSelector((state) => state.members);
  const { error: newNicknameErrorMessage } = userInfoAsyncState;

  const handleEditUsername = async (event) => {
    event.preventDefault();

    const { newNickname, password } = getFormData(event.target);
    const response = await dispatch(membersThunk.userEditNickname({ newNickname, password }));

    if (response.status === REQUEST_STATUS.FAIL) return;

    navigate('/');
  };

  const handleEditPassword = (event) => {
    event.preventDefault();

    const { oldPassword, newPassword, newPasswordConfirm } = getFormData(event.target);
    console.log(oldPassword, newPassword, newPasswordConfirm);
  };

  return (
    <>
      <Title description="회원님의 비밀번호를 변경을 위해 이전 비밀번호와 새로운 비밀번호를 입력해주세요.">
        <Icon icon={ICON_CODE.USER} />
        회원정보 관리
      </Title>

      <EditProfile
        newNicknameErrorMessage={newNicknameErrorMessage}
        handleEditUsername={handleEditUsername}
        handleEditPassword={handleEditPassword}
      />
    </>
  );
}

export default ProfileEditPage;
