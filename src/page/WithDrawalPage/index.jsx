import React, {useState, useEffect} from 'react';

import * as S from './style';
import baedaleTear from 'assets/baedale_tear.png';

import CheckBox from 'component/common/CheckBox';
import useFetch from 'hook/useFetch';
import {useNavigate} from 'react-router-dom';
import {PATH} from 'constant';
import {useDispatch} from 'react-redux';
import {AUTH} from 'store/modules/auth';
import useControlledInput from 'hook/useControlledInput';
import {ERROR_MESSAGE} from 'constant';

function WithDrawalPage() {
  const [isChecked, setIsChecked] = useState(false);

  const [onChangePassword, restPassword] = useControlledInput({});

  const navigation = useNavigate();

  const dispatch = useDispatch();

  const withDrawal = useFetch('delete');

  const handleCheckBoxClick = () => setIsChecked((prevState) => !prevState);

  const onSubmit = async (inputs) => {
    const [password] = inputs;
    const response = await JSON.parse(localStorage.getItem('accessToken'));
    const accessToken = response.accessToken;

    withDrawal.fetch({
      API_URL: process.env.REACT_APP_WITHDRAWAL_API_URL,
      body: {
        password: password.value,
      },
      headers: {Authorization: `Bearer ${accessToken}`},
      onSuccess: (location) => {
        navigation(PATH.HOME);
        dispatch({type: AUTH.LOGOUT});
        localStorage.removeItem('accessToken');
      },
    });
  };

  useEffect(() => {
    withDrawal.error && alert(ERROR_MESSAGE.WITHDRAWAL);
  }, [withDrawal.error]);

  return (
    <S.Layout>
      <S.WithDrawalContainer>
        <S.HeaderRow>
          <S.WithDrawalImage src={baedaleTear} />
          <S.Header>회원탈퇴</S.Header>
        </S.HeaderRow>
        <S.WithDrawalSection>
          <S.WithDrawalText>
            탈퇴 안내
            <br />
            회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.
            <br />
            <br />
            사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가능합니다.
            <br />
            <br />
            장바구니, 구매 이력 등 개인형 서비스 이용기록은 모두 삭제되며, 삭제된 데이터는 복구되지
            않습니다.
            <br />
            <br />
            <S.TextWithCheckBox>
              안내 사항을 모두 확인하였으며, 이에 동의합니다.
              <CheckBox onClick={handleCheckBoxClick} />
            </S.TextWithCheckBox>
          </S.WithDrawalText>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e.target);
            }}
          >
            <S.WithDrawalInput
              {...restPassword}
              type="password"
              id="password"
              size="large"
              label="비밀번호"
              placeHolder="비밀번호를 입력해주세요."
              onChange={(e) => onChangePassword(e.target.value)}
            />
            <S.WithDrawalButton isDisabled={!isChecked || !restPassword.value} type="submit">
              회원탈퇴
            </S.WithDrawalButton>
          </form>
        </S.WithDrawalSection>
      </S.WithDrawalContainer>
    </S.Layout>
  );
}

export default WithDrawalPage;
