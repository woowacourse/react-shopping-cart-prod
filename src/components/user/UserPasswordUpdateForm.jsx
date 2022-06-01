import { updatePassword } from 'api/userApi';
import { Form, Input } from 'components/common';
import useInputValue from 'hooks/useInputValue';
import { useNavigate } from 'react-router-dom';

const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

function UserPasswordUpdateForm() {
  const [passwordValue, setPasswordValue, isPasswordValid] =
    useInputValue(passwordPattern);

  const [passwordConfirmValue, setPasswordConfirmValue, isPasswordConfirmValid] =
    useInputValue(passwordPattern);

  const navigate = useNavigate();

  const handlePasswordInput = ({ target: { value } }) => {
    setPasswordValue(value);
  };
  const handlePasswordConfirmInput = ({ target: { value } }) => {
    setPasswordConfirmValue(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid || passwordValue !== passwordConfirmValue) {
      alert('땡!');
      return;
    }

    try {
      await updatePassword(passwordValue);

      alert('성공~~!');
      navigate('/user-info');
    } catch ({ message }) {
      alert(message);
    }
  };

  const inputAttributeList = [
    {
      name: 'password',
      type: 'password',
      labelText: '비밀번호',
      placeholder: '비밀번호를 입력해주세요',
      value: passwordValue,
      onChange: handlePasswordInput,
      isValid: isPasswordValid,
    },
    {
      name: 'password-confirm',
      type: 'password',
      labelText: '비밀번호 확인',
      placeholder: '비밀번호를 다시 입력해주세요',
      value: passwordConfirmValue,
      onChange: handlePasswordConfirmInput,
      isValid: isPasswordConfirmValid,
    },
  ];
  return (
    <Form buttonText="수정 완료" onSubmit={onSubmit}>
      {inputAttributeList.map((inputDescription) => (
        <Input key={inputDescription.name} {...inputDescription} required={true} />
      ))}
    </Form>
  );
}

export default UserPasswordUpdateForm;
