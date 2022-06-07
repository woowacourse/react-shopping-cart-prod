import * as S from 'pages/SigninPage/SigninPage.styled';
import useSigninForm from 'pages/SigninPage/useSigninForm';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import PlainLink from 'components/PlainLink/PlainLink';

function SigninPage() {
  const { handleSubmit } = useSigninForm();

  return (
    <S.PageBox>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Section>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            required
          />
        </S.Section>
        <S.Section>
          <Button type="submit">로그인</Button>
          <PlainLink to="/signup/1">
            <Button type="button" color="white">
              회원가입
            </Button>
          </PlainLink>
        </S.Section>
      </S.Form>
    </S.PageBox>
  );
}

export default SigninPage;
