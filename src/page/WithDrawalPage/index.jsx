import React, {useState} from 'react';

import * as S from './style';
import baedaleTear from 'assets/baedale_tear.png';

import CheckBox from 'component/common/CheckBox';

function WithDrawal() {
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckBoxClick = () => setIsChecked((prevState) => !prevState);

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
            사용하고 계신 아이디(nine0909)는 탈퇴할 경우 재사용 및 복구가 불가능합니다.
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

          <S.WithDrawalInput
            type="password"
            id="password"
            size="large"
            label="비밀번호"
            placeHolder="********"
          />
          <S.WithDrawalButton disabled={isChecked}>회원탈퇴</S.WithDrawalButton>
        </S.WithDrawalSection>
      </S.WithDrawalContainer>
    </S.Layout>
  );
}

export default WithDrawal;
