import {
  isValidPasswordAllCharacters,
  isValidPasswordLength,
} from 'utils/validator';
import PATH from 'constants/path';
import { USER_MESSAGE } from 'constants/message';
import authAPI from 'apis/auth';
import { createInputValueGetter } from 'utils/dom';
import { formatPhoneNumber } from 'utils/formats';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useSignupForm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordLengthCorrect, setIsPasswordLengthCorrect] = useState(false);
  const [isPasswordAllCharactersCorrect, setIsPasswordAllCharactersCorrect] =
    useState(false);
  const [isPasswordCheckCorrect, setIsPasswordCheckCorrect] = useState(false);

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    setIsPasswordLengthCorrect(isValidPasswordLength(e.target.value));
    setIsPasswordAllCharactersCorrect(
      isValidPasswordAllCharacters(e.target.value)
    );

    if (!!passwordCheck) {
      setIsPasswordCheckCorrect(passwordCheck === e.target.value);
    }
  };

  const handlePasswordCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);

    if (!!password) {
      setIsPasswordCheckCorrect(password === e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElements = e.target.elements;
    const getInputValue = createInputValueGetter(formElements);
    const user = {
      username: getInputValue('id'),
      password: getInputValue('password'),
      email: getInputValue('email'),
      address: getInputValue('address'),
      phoneNumber: formatPhoneNumber(getInputValue('phoneNumber')),
    };

    try {
      authAPI.signup(user);
      navigate(PATH.LOGIN);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_SIGNUP);
    }
  };

  return {
    password,
    passwordCheck,
    isPasswordLengthCorrect,
    isPasswordAllCharactersCorrect,
    isPasswordCheckCorrect,
    handleSubmit,
    handlePasswordInput,
    handlePasswordCheckInput,
  };
};

export default useSignupForm;
