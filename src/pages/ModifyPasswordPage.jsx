import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUser from '../hooks/useUser';
import useUserForm from '../hooks/useUserForm';
import { validPasswordInfo } from '../utils/validations';
import { USER, PASSWORD_INFO_KEY } from '../constants';

function ModifyPasswordPage() {
  const { modifyPassword } = useUser();
  const {
    state: passwords,
    setState: setPasswords,
    handleUserInfoChange,
  } = useUserForm({
    prevPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const { prevPassword, newPassword, newPasswordConfirm } = passwords;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    try {
      validPasswordInfo(newPassword, newPasswordConfirm);
      modifyPassword(prevPassword, newPassword);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <StyledUserContainer>
      <h1>비밀번호 수정</h1>
      <StyledUserForm onSubmit={handlePasswordSubmit}>
        <Input
          labelText="현재 비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={prevPassword}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(setPasswords, PASSWORD_INFO_KEY.PREV_PASSWORD)}
        />
        <Input
          labelText="새로운 비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPassword}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(setPasswords, PASSWORD_INFO_KEY.NEW_PASSWORD)}
        />
        <Input
          labelText="새로운 비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={newPasswordConfirm}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(setPasswords, PASSWORD_INFO_KEY.NEW_PASSWORD_CONFIRM)}
        />
        <Button>수정하기</Button>
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default ModifyPasswordPage;
