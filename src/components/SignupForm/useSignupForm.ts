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
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { snackBarActions } from 'redux/reducers/snackBar';

const useSignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    id: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const [isPasswordLengthCorrect, setIsPasswordLengthCorrect] = useState(false);
  const [isPasswordAllCharactersCorrect, setIsPasswordAllCharactersCorrect] =
    useState(false);
  const [isPasswordCheckCorrect, setIsPasswordCheckCorrect] = useState(false);

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    setIsPasswordLengthCorrect(isValidPasswordLength(e.target.value));
    setIsPasswordAllCharactersCorrect(
      isValidPasswordAllCharacters(e.target.value)
    );

    if (!!inputs.passwordCheck) {
      setIsPasswordCheckCorrect(inputs.passwordCheck === e.target.value);
    }
  };

  const handlePasswordCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    if (!!inputs.password) {
      setIsPasswordCheckCorrect(inputs.password === e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      await authAPI.signup(user);
      dispatch(snackBarActions.show('회원가입 되었습니다 😆'));
      navigate(PATH.LOGIN);
    } catch (error) {
      alert(USER_MESSAGE.FAIL_SIGNUP);
    }
  };

  return {
    inputs,
    onChange,
    isPasswordLengthCorrect,
    isPasswordAllCharactersCorrect,
    isPasswordCheckCorrect,
    handleSubmit,
    handlePasswordInput,
    handlePasswordCheckInput,
  };
};

export default useSignupForm;
