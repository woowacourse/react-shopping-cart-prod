import styled, { css } from 'styled-components';
import LabeledInput from 'components/@shared/LabeledInput';
import useSignupForm from './useSignupForm';
import REG_EXP from 'constants/regExp';
import authAPI from 'apis/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { snackBarActions } from 'redux/reducers/snackBar';

function SignupForm() {
  const dispatch = useDispatch();
  const {
    inputs,
    onChange,
    isPasswordLengthCorrect,
    isPasswordAllCharactersCorrect,
    isPasswordCheckCorrect,
    handleSubmit,
    handlePasswordInput,
    handlePasswordCheckInput,
  } = useSignupForm();

  const handleIdCheck = async () => {
    const data = await authAPI.checkIdDuplicated(inputs.id);
    if (!data.duplicated) {
      dispatch(snackBarActions.show('사용 가능한 아이디 입니다.'));
      return;
    }
    alert('중복된 아이디입니다.');
  };

  const handleEmailCheck = async () => {
    const data = await authAPI.checkEmailDuplicated(inputs.email);
    if (!data.duplicated) {
      dispatch(snackBarActions.show('사용 가능한 이메일 입니다.'));
      return;
    }
    alert('중복된 이메일입니다.');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <LabeledInput
        id="id"
        type="text"
        placeholder="아이디를 입력해주세요"
        pattern={REG_EXP.ID}
        required
        onChange={onChange}
      >
        아이디
        <StyledCheckButton type="button" onClick={handleIdCheck}>
          중복 체크
        </StyledCheckButton>
      </LabeledInput>
      <LabeledInput
        id="email"
        type="email"
        placeholder="이메일을 입력해주세요"
        pattern={REG_EXP.EMAIL}
        required
        onChange={onChange}
      >
        이메일
        <StyledCheckButton type="button" onClick={handleEmailCheck}>
          중복 체크
        </StyledCheckButton>
      </LabeledInput>
      <LabeledInput
        id="password"
        type="password"
        placeholder="8~16자의 비밀번호(영문 소문자, 숫자, 특수문자)를 입력해주세요"
        value={inputs.password}
        onChange={handlePasswordInput}
        pattern={REG_EXP.PASSWORD}
        required
      >
        비밀번호
        <StyledErrorSign
          isCorrect={isPasswordLengthCorrect && isPasswordAllCharactersCorrect}
        >
          ✓
        </StyledErrorSign>
        <StyledErrorMessage isCorrect={isPasswordLengthCorrect}>
          ∙ 8~16자 입력
        </StyledErrorMessage>
        <StyledErrorMessage isCorrect={isPasswordAllCharactersCorrect}>
          ∙ 영문, 숫자, 특수문자 모두 입력
        </StyledErrorMessage>
      </LabeledInput>
      <LabeledInput
        id="passwordCheck"
        type="password"
        placeholder="비밀번호를 재입력해주세요"
        value={inputs.passwordCheck}
        onChange={handlePasswordCheckInput}
        pattern={REG_EXP.PASSWORD}
        required
      >
        비밀번호 재확인
        <StyledErrorSign isCorrect={isPasswordCheckCorrect}>✓</StyledErrorSign>
      </LabeledInput>
      <LabeledInput
        id="address"
        type="address"
        placeholder="주소를 입력해주세요"
        maxLength={255}
        required
      >
        주소
      </LabeledInput>
      <LabeledInput
        id="phoneNumber"
        type="tel"
        placeholder="핸드폰 번호를 입력해주세요"
        maxLength={11}
        required
      >
        핸드폰 번호
      </LabeledInput>
      <StyledSignupButton type="submit">회원가입</StyledSignupButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  > label {
    margin-top: 4px;
    font-size: 14px;
  }

  > input {
    border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
    border-radius: 2px;
    padding: 6px 8px;
  }
`;

const StyledErrorSign = styled.span`
  margin: 0 24px 0 12px;
  font-size: 16px;

  ${({ isCorrect }: { isCorrect: boolean }) => css`
    color: ${({ theme: { colors } }) =>
      isCorrect ? colors.green : colors.black};
  `}
`;

const StyledErrorMessage = styled.span`
  margin-left: 30px;
  font-size: 11px;

  ${({ isCorrect }: { isCorrect: boolean }) => css`
    color: ${({ theme: { colors } }) =>
      isCorrect ? colors.green : colors.black};
    font-weight: ${isCorrect ? 800 : 500};
  `}
`;

const StyledSignupButton = styled.button`
  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: 5px;

  height: 40px;
  margin-top: 20px;

  font-size: 17px;
  font-weight: 900;
`;

const StyledCheckButton = styled.button`
  margin-left: 20px;
  padding: 0 4px;
  border-radius: 5px;
  background-color: ${({ theme: { colors } }) => colors.pink};
`;
export default SignupForm;
