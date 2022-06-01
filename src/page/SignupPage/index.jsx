import React from 'react';

import * as S from './style';
import Input from 'component/common/Input';
import theme from 'theme/theme';
import useControlledInput from 'hook/useControlledInput';

function SignupPage() {
  const [onChangeId, restId] = useControlledInput({
    message: '4~16자의 영어 소문자, 숫자만 사용 가능합니다.',
    isError: (userId) => !/^[a-z0-9]{4,15}$/g.test(userId) && userId.length > 0,
  });

  const [onChangeNickname, restNickname] = useControlledInput({
    message: '2~10자만 입력 가능합니다.',
    isError: (nickName) => nickName.length < 2 || nickName.length > 10,
  });

  const [onChangePassword, restPassword] = useControlledInput({
    message:
      '8~20자 영어 대문자, 소문자, 숫자, 특수문자 각각 반드시 1개 이상 포함 된 비밀번호를 사용하세요.',
    isError: (password) => !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20}/g.test(password),
  });

  const [onChangeConfirmPassword, restConfirmPassword] = useControlledInput({
    message: '비밀번호가 다릅니다.',
    isError: (confirmPassword) => restPassword.value !== confirmPassword,
  });

  const [onChangeAddress, restAddress] = useControlledInput({
    message: '255자 이하로 작성해주세요.',
    isError: (address) => address.length > 255,
  });

  const [onChangeStartNumber, restStartNumber] = useControlledInput({
    message: '3자리 숫자',
    isError: (number) => number.length !== 3 || !Number.parseInt(number),
  });

  const [onChangeMiddleNumber, restMiddleNumber] = useControlledInput({
    message: '4자리 숫자',
    isError: (number) => number.length !== 4 || !Number.parseInt(number),
  });

  const [onChangeLastNumber, restLastNumber] = useControlledInput({
    message: '4자리 숫자',
    isError: (number) => number.length !== 4 || !Number.parseInt(number),
  });

  return (
    <S.Layout>
      <S.SignupContainer>
        <S.Header>회원가입</S.Header>
        <S.InputCol>
          <Input
            label="아이디"
            size="medium"
            id="id"
            placeHolder="아이디를 입력해주세요"
            onChange={(e) => onChangeId(e.target.value)}
            {...restId}
          />
          <Input
            label="닉네임"
            size="medium"
            id="nickname"
            placeHolder="닉네임을 입력해주세요"
            onChange={(e) => onChangeNickname(e.target.value)}
            {...restNickname}
          />
          <S.PasswordContainer>
            <Input
              label="비밀번호"
              size="medium"
              id="password"
              type="password"
              placeHolder="비밀번호를 입력해주세요"
              onChange={(e) => onChangePassword(e.target.value)}
              {...restPassword}
            />
            <Input
              size="medium"
              id="password-confirm"
              type="password"
              placeHolder="비밀번호 확인"
              onChange={(e) => onChangeConfirmPassword(e.target.value)}
              {...restConfirmPassword}
            />
          </S.PasswordContainer>
          <Input
            label="주소"
            size="medium"
            id="address"
            placeHolder="주소를 입력해주세요"
            onChange={(e) => onChangeAddress(e.target.value)}
            {...restAddress}
          />
          <S.PhoneNumberContainer>
            <Input
              label="휴대폰"
              size="small"
              id="start-number"
              onChange={(e) => onChangeStartNumber(e.target.value)}
              maxLength="3"
              {...restStartNumber}
            />
            <S.Hyphen>-</S.Hyphen>
            <Input
              size="small"
              id="middle-number"
              onChange={(e) => onChangeMiddleNumber(e.target.value)}
              maxLength="4"
              {...restMiddleNumber}
            />
            <S.Hyphen>-</S.Hyphen>
            <Input
              size="small"
              id="last-number"
              onChange={(e) => onChangeLastNumber(e.target.value)}
              maxLength="4"
              {...restLastNumber}
            />
          </S.PhoneNumberContainer>
          <S.ConfirmButton
            fontSize="14px"
            backgroundColor={theme.MINT_500}
            width="300px"
            height="36px"
            type="submit"
          >
            확인
          </S.ConfirmButton>
        </S.InputCol>
      </S.SignupContainer>
    </S.Layout>
  );
}

export default SignupPage;
