import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useInput from 'hooks/useInput';

import { COLORS } from 'styles/theme';
import { 비동기_요청 } from 'constants/';

import Layout from 'components/Layout';
import PageHeader from 'components/@common/PageHeader';
import Button from 'components/@common/Button/styles';
import Input from 'components/@common/Input/styles';
import ErrorMessage from 'components/@common/ErrorMessage';

import { requestCheckDuplicatedId, requestSignUp } from 'api';
import { snackbar } from 'actions/snackbar';
import * as Validate from 'utils/validate';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value: userId, setValue: setUserId, checkValue: checkUserId } = useInput(Validate.userId);
  const {
    value: userPassword,
    setValue: setUserPassword,
    checkValue: checkUserPassword,
  } = useInput(Validate.userPassword);
  const {
    value: userNickName,
    setValue: setUserNickName,
    checkValue: checkUserNickName,
  } = useInput(Validate.userNickName);
  const {
    value: userAge,
    setValue: setUserAge,
    checkValue: checkUserAge,
  } = useInput(Validate.userAge);

  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
  const [checkUserPasswordConfirm, setCheckUserPasswordConfirm] = useState(false);

  const [checkDuplicatedId, setCheckDuplicatedId] = useState(false);

  const isValidForm = useMemo(
    () =>
      checkUserId &&
      checkDuplicatedId &&
      checkUserPassword &&
      checkUserPasswordConfirm &&
      checkUserAge &&
      checkUserNickName,
    [
      checkUserId,
      checkDuplicatedId,
      checkUserPassword,
      checkUserPasswordConfirm,
      checkUserAge,
      checkUserNickName,
    ],
  );

  useEffect(() => {
    setCheckUserPasswordConfirm(userPassword === userPasswordConfirm);
  }, [userPassword, userPasswordConfirm]);

  useEffect(() => {
    setCheckDuplicatedId(false);
  }, [userId]);

  const handleRequestDuplicatedId = () => {
    let timer;

    return () => {
      if (timer) return;
      timer = setTimeout(async () => {
        timer = null;
        const { content } = await requestCheckDuplicatedId(userId);

        const message = content.isUnique ? '사용가능한 아이디입니다!' : '중복된 아이디입니다!';
        dispatch(snackbar.pushMessageSnackbar(message));
        setCheckDuplicatedId(content.isUnique);
      }, 1000);
    };
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await requestSignUp({
      username: userId,
      nickname: userNickName,
      password: userPassword,
      age: userAge,
    });

    const message =
      response.status === 비동기_요청.SUCCESS
        ? '회원가입에 성공하였습니다!'
        : '회원가입에 실패하였습니다!';
    dispatch(snackbar.pushMessageSnackbar(message));
    navigate('/');
  };

  return (
    <Layout>
      <Styled.SignUpContainer>
        <CommonStyled.Container flexDirection="column" justifyContent="center">
          <PageHeader color={COLORS.GRAY_300}>회원가입</PageHeader>
          <form style={{ width: '100%' }} onSubmit={handleSignUp}>
            <CommonStyled.FlexWrapper
              alignItems="flex-end"
              justifyContent="space-between"
              margin="0 0 1rem 0"
            >
              <label html-for="input-user-name">
                아이디
                <Input
                  id="input-user-name"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  type="text"
                  width="120%"
                  placeholder="아이디를 입력해주세요"
                  minLength={4}
                  maxLength={20}
                  margin="1rem 0 0 0"
                  border={`1px solid ${COLORS.GRAY_400}`}
                  focusBorderColor={COLORS.MINT_200}
                />
              </label>
              <Button
                type="button"
                width="20%"
                height="60px"
                color={COLORS.MINT_200}
                backgroundColor={COLORS.WHITE}
                margin="0.5rem 0 0 0"
                border={`1px solid ${COLORS.MINT_200}`}
                hoverColor={COLORS.MINT_100}
                onClick={() => handleRequestDuplicatedId()()}
              >
                중복확인
              </Button>
            </CommonStyled.FlexWrapper>

            {checkUserId || <ErrorMessage>4~20 사이의 영문, 숫자로 입력해주세요</ErrorMessage>}
            {checkDuplicatedId || <ErrorMessage>아이디 중복확인을 완료해주세요</ErrorMessage>}
            <label html-for="input-user-password">
              비밀번호
              <Input
                id="input-user-password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                type="password"
                placeholder="비밀번호를 입력해주세요"
                minLength={4}
                maxLength={20}
                margin="1rem 0"
                border={`1px solid ${COLORS.GRAY_400}`}
              />
            </label>

            {checkUserPassword || (
              <ErrorMessage>8~20 사이의 영문자, 특수문자, 숫자로 입력해주세요</ErrorMessage>
            )}
            <label html-for="input-user-check-password">
              비밀번호 확인
              <Input
                id="input-user-check-password"
                value={userPasswordConfirm}
                onChange={(e) => setUserPasswordConfirm(e.target.value)}
                placeholder="비밀번호를 똑같이 입력해주세요"
                type="password"
                minLength={4}
                maxLength={20}
                margin="1rem 0"
                border={`1px solid ${COLORS.GRAY_400}`}
              />
            </label>

            {checkUserPasswordConfirm || (
              <ErrorMessage>위에 입력한 비밀번호와 동일하게 입력해주세요</ErrorMessage>
            )}
            <label html-for="input-user-nickname">
              이름
              <Input
                id="input-user-nickname"
                value={userNickName}
                onChange={(e) => setUserNickName(e.target.value)}
                placeholder="이름을 입력해주세요"
                type="text"
                minLength={1}
                maxLegnth={10}
                margin="1rem 0"
                border={`1px solid ${COLORS.GRAY_400}`}
              />
            </label>

            {checkUserNickName || <ErrorMessage>1~10글자 이내로 입력해주세요</ErrorMessage>}
            <label html-for="input-user-age">
              나이
              <Input
                id="input-user-age"
                value={userAge}
                onChange={(e) => setUserAge(e.target.value)}
                placeholder="나이를 입력해주세요"
                type="number"
                min={0}
                max={200}
                margin="1rem 0"
                border={`1px solid ${COLORS.GRAY_400}`}
              />
            </label>

            {checkUserAge || <ErrorMessage>0살 이상의 숫자를 입력해주세요</ErrorMessage>}
            <Button
              margin="0.5rem 0"
              backgroundColor={COLORS.MINT_200}
              hoverColor={COLORS.MINT_100}
              disabled={!isValidForm}
            >
              가입하기
            </Button>
          </form>
        </CommonStyled.Container>
      </Styled.SignUpContainer>
    </Layout>
  );
};

export default SignUp;
