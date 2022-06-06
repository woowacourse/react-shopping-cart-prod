import React, {useEffect} from 'react';

import * as S from './style';
import Input from 'component/common/Input';
import theme from 'theme/theme';
import useControlledInput from 'hook/useControlledInput';
import useFetch from 'hook/useFetch';
import {useNavigate} from 'react-router-dom';
import {ERROR_MESSAGE, PATH, VALIDATION_MESSAGE} from 'constant';

function SignUpPage() {
  const navigation = useNavigate();

  const [onChangeId, restId] = useControlledInput({
    message: VALIDATION_MESSAGE.ID,
    isError: (userId) => !/^[a-z0-9]{4,15}$/g.test(userId) && userId.length > 0,
  });

  const [onChangeNickname, restNickname] = useControlledInput({
    message: VALIDATION_MESSAGE.NICKNAME,
    isError: (nickName) => nickName.length < 2 || nickName.length > 10,
  });

  const [onChangePassword, restPassword] = useControlledInput({
    message: VALIDATION_MESSAGE.PASSWORD,
    isError: (password) => !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20}/g.test(password),
  });

  const [onChangeConfirmPassword, restConfirmPassword] = useControlledInput({
    message: VALIDATION_MESSAGE.CONFIRM_PASSWORD,
    isError: (confirmPassword) => restPassword.value !== confirmPassword,
  });

  const [onChangeAddress, restAddress] = useControlledInput({
    message: VALIDATION_MESSAGE.ADDRESS,
    isError: (address) => address.length > 255,
  });

  const [onChangeStartNumber, restStartNumber] = useControlledInput({
    message: VALIDATION_MESSAGE.THREE_LENGTH_NUMBER,
    isError: (number) => number.length !== 3 || !Number.parseInt(number),
  });

  const [onChangeMiddleNumber, restMiddleNumber] = useControlledInput({
    message: VALIDATION_MESSAGE.FOUR_LENGTH_NUMBER,
    isError: (number) => number.length !== 4 || !Number.parseInt(number),
  });

  const [onChangeLastNumber, restLastNumber] = useControlledInput({
    message: VALIDATION_MESSAGE.FOUR_LENGTH_NUMBER,
    isError: (number) => number.length !== 4 || !Number.parseInt(number),
  });

  const submitError =
    restId.isError ||
    restNickname.isError ||
    restPassword.isError ||
    restConfirmPassword.isError ||
    restAddress.isError ||
    restStartNumber.isError ||
    restMiddleNumber.isError ||
    restLastNumber.isError;

  const signUp = useFetch('post');

  const onSubmit = (inputs) => {
    // eslint-disable-next-line no-unused-vars
    const [account, nickname, password, confirmPassword, address, start, middle, last] = inputs;

    signUp.fetch({
      API_URL: process.env.REACT_APP_SIGN_UP_API_URL,
      body: {
        account: account.value,
        nickname: nickname.value,
        password: password.value,
        address: address.value,
        phoneNumber: {
          start: start.value,
          middle: middle.value,
          last: last.value,
        },
      },
      onSuccess: (location) => {
        navigation(PATH.LOGIN);
      },
    });
  };

  useEffect(() => {
    signUp.error && alert(ERROR_MESSAGE.SIGN_UP);
  }, [signUp.error]);

  return (
    <S.Layout>
      <S.SignUpContainer>
        <S.Header>회원가입</S.Header>
        <S.InputForm
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e.target);
          }}
        >
          <Input
            {...restId}
            label="아이디"
            size="medium"
            id="id"
            placeHolder="아이디를 입력해주세요"
            onChange={(e) => onChangeId(e.target.value)}
          />
          <Input
            {...restNickname}
            label="닉네임"
            size="medium"
            id="nickname"
            placeHolder="닉네임을 입력해주세요"
            onChange={(e) => onChangeNickname(e.target.value)}
          />
          <S.PasswordContainer>
            <Input
              {...restPassword}
              label="비밀번호"
              size="medium"
              id="password"
              type="password"
              placeHolder="비밀번호를 입력해주세요"
              onChange={(e) => {
                onChangePassword(e.target.value);
                onChangeConfirmPassword('');
              }}
            />
            <Input
              {...restConfirmPassword}
              size="medium"
              id="password-confirm"
              type="password"
              placeHolder="비밀번호 확인"
              onChange={(e) => onChangeConfirmPassword(e.target.value)}
            />
          </S.PasswordContainer>
          <Input
            {...restAddress}
            label="주소"
            size="medium"
            id="address"
            placeHolder="주소를 입력해주세요"
            onChange={(e) => onChangeAddress(e.target.value)}
          />
          <S.PhoneNumberContainer>
            <Input
              {...restStartNumber}
              label="휴대폰"
              size="small"
              id="start-number"
              onChange={(e) => onChangeStartNumber(e.target.value)}
              maxLength="3"
            />
            <S.Hyphen>-</S.Hyphen>
            <Input
              {...restMiddleNumber}
              size="small"
              id="middle-number"
              onChange={(e) => onChangeMiddleNumber(e.target.value)}
              maxLength="4"
            />
            <S.Hyphen>-</S.Hyphen>
            <Input
              {...restLastNumber}
              size="small"
              id="last-number"
              onChange={(e) => onChangeLastNumber(e.target.value)}
              maxLength="4"
            />
          </S.PhoneNumberContainer>
          <S.ConfirmButton
            fontSize="14px"
            backgroundColor={theme.MINT_500}
            width="300px"
            height="36px"
            type="submit"
            isDisabled={submitError}
          >
            확인
          </S.ConfirmButton>
        </S.InputForm>
      </S.SignUpContainer>
    </S.Layout>
  );
}

export default SignUpPage;
