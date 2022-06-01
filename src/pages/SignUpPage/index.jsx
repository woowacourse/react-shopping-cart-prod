import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, FlexContainer } from 'components/@common';
import FieldSet from 'components/@common/FieldSet';
import InputField from 'components/@common/InputField';

import * as S from './styles';

function SignUpPage() {
  return (
    <S.Container onBlur={(event) => console.log(event)}>
      <FieldSet labelText="이메일">
        <InputField
          name="userId"
          status=""
          type="text"
          message=""
          placeholder="로그인 시 사용할 이메일"
          value=""
        />
      </FieldSet>

      <FieldSet labelText="비밀번호">
        <InputField
          name="password"
          type="password"
          status=""
          message=""
          placeholder="영문, 숫자, 특수문자 조합 최소 8자 최대 16자"
          value=""
        />

        <InputField
          name="password-confirm"
          type="password"
          status=""
          message=""
          placeholder="비밀번호 재입력"
          value=""
        />
      </FieldSet>

      <FieldSet labelText="닉네임">
        <InputField
          name="nickname"
          type="text"
          status=""
          message=""
          placeholder="영문, 한글, 숫자로 최소 2자, 최대 10자"
          value=""
        />
      </FieldSet>

      <FlexContainer gap={20}>
        <Button type="button" status="primary">
          회원가입
        </Button>
        <S.NonMemberText>
          싱싱청과물, <Link to="/">비회원으로 계속하기</Link>
        </S.NonMemberText>
      </FlexContainer>
    </S.Container>
  );
}

SignUpPage.propTypes = {};

SignUpPage.defaultPages = {};

export default SignUpPage;
