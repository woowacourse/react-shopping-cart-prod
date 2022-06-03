import { useState } from 'react';
import { duplicateEmailApi } from 'api/auth';

const validateEmail = (email) => {
  const isValid =
    /^[0-9a-z]([-_]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*\.[a-z]{2,3}$/.test(
      email,
    );

  if (isValid) return { text: '멋진 이메일입니다!', isValid };

  return {
    text: '영문 소문자, 숫자,특수기호(_)(-)만 사용 가능합니다.',
    isValid,
  };
};

const validateEmailAsync = async (email) => {
  return await duplicateEmailApi(email)
    .then(() => {
      return { text: '멋진 이메일입니다!', isValid: true };
    })
    .catch(() => {
      return {
        text: '중복된 이메일입니다.',
        isValid: false,
      };
    });
};

const validateName = (name) => {
  const isValid = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,10}$/.test(name);

  if (isValid) return { text: '멋진 이름입니다!', isValid };

  return {
    text: '영문, 한글, 숫자 10글자 이하만 사용하세요.',
    isValid,
  };
};

const validatePassword = (password) => {
  const isValid =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!?-])[A-Za-z\d@!?-]{6,}$/.test(
      password,
    );

  if (isValid) return { text: '안전한 비밀번호입니다!', isValid };

  return {
    text: '영문 대소문자, 특수문자(!, @, ?, -) 를 포함한 6글자 이상 사용하세요.',
    isValid,
  };
};

const validatePasswordCheck = (password, passwordConfirm) => {
  const isValid = password === passwordConfirm;
  if (isValid) return { text: '비밀번호가 일치합니다!', isValid };

  return {
    text: '비밀번호가 일치하지 않습니다.',
    isValid,
  };
};

const types = ['email', 'name', 'password', 'passwordCheck'];

const useInputValidate = (type) => {
  const [validation, setValidation] = useState({ text: '', isValid: false });

  if (!types.includes(type)) throw new Error('타입이 잘못 되었습니다.');

  const handleBlur = (args) => async (e) => {
    switch (type) {
      case 'email': {
        const { text, isValid } = validateEmail(e.target.value);
        if (!isValid) {
          setValidation({ text, isValid });
          return;
        }
        const result = await validateEmailAsync(e.target.value);
        setValidation(result);
        break;
      }

      case 'name':
        setValidation(validateName(e.target.value));
        break;

      case 'password':
        setValidation(validatePassword(e.target.value));
        break;

      case 'passwordCheck':
        setValidation(validatePasswordCheck(args, e.target.value));
        break;
    }
  };

  return [validation, handleBlur];
};

export default useInputValidate;
