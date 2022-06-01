import React from 'react';

import * as S from './style';
import Input from 'component/common/Input';
import theme from 'theme/theme';
import useControlledInput from 'hook/useControlledInput';

function UserInfoEditPage() {
  const [onChangeNickname, restNickname] = useControlledInput({
    message: '2~10자만 입력 가능합니다.',
    isError: (nickName) => nickName.length < 2 || nickName.length > 10,
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
        <S.Header>회원 정보 수정</S.Header>
        <S.InputCol>
          <Input
            label="아이디"
            size="medium"
            id="id"
            placeHolder="아이디를 입력해주세요"
            isDisabled={true}
          />
          <Input
            label="닉네임"
            size="medium"
            id="nickname"
            placeHolder="닉네임을 입력해주세요"
            onChange={(e) => onChangeNickname(e.target.value)}
            {...restNickname}
          />
          <Input
            label="비밀번호"
            size="medium"
            id="password"
            placeHolder="비밀번호 (영문+숫자+특수문자 8자 이상)"
            isDisabled={true}
          />
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
          >
            확인
          </S.ConfirmButton>
        </S.InputCol>
      </S.SignupContainer>
    </S.Layout>
  );
}

export default UserInfoEditPage;
