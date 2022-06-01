import { Link } from 'react-router-dom';

import { Button, FlexContainer } from 'components/@common';
import FieldSet from 'components/@common/FieldSet';
import InputField from 'components/@common/InputField';

import { PAGE_LIST } from 'constants/';

import * as S from './styles';

function LoginPage() {
  return (
    <S.Container onBlur={(event) => console.log(event)}>
      <FieldSet labelText="이메일">
        <InputField
          name="userId"
          status=""
          type="text"
          message=""
          placeholder="이메일을 입력하여주세요."
          value=""
        />
      </FieldSet>

      <FieldSet labelText="비밀번호">
        <InputField
          name="password"
          type="password"
          status=""
          message=""
          placeholder="비밀번호를 입력하여주세요."
          value=""
        />
      </FieldSet>

      <FlexContainer gap={20}>
        <Button type="submit" status="primary">
          로그인
        </Button>
        <S.NonMemberText>
          싱싱청과물, <Link to={PAGE_LIST.SIGN_UP}>간편 회원가입하기</Link>
        </S.NonMemberText>
      </FlexContainer>
    </S.Container>
  );
}

export default LoginPage;
